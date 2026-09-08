import React, { useCallback, useEffect, useRef } from 'react';

/**
 * PixelRevealBackground
 *
 * Move the cursor over it to "erode" the top image in a pixelated brush
 * trail — the destroyed cells fall away with gravity, revealing a second
 * image underneath. The top image heals back over a few seconds (tune
 * with healSpeed).
 *
 * Fills its parent (width/height: 100%), so wrap it in an absolutely
 * positioned layer behind your real content to use it as a section/hero
 * background:
 *
 *   <section className="relative h-screen">
 *     <div className="absolute inset-0">
 *       <PixelRevealBackground image="/top.jpg" revealImage="/under.jpg" />
 *     </div>
 *     <div className="relative z-10">...your actual hero content...</div>
 *   </section>
 *
 * Props:
 *  - image             (required) top layer, gets destroyed by the cursor
 *  - revealImage        bottom layer revealed underneath (plain black if empty)
 *  - pixelSize          size of each destructible cell, in px
 *  - brushRadius        cursor brush radius, in px
 *  - healSpeed          how fast the trail fades / top image heals back
 *  - trailOpacity       opacity of the falling debris blocks
 *  - gravityEnabled      toggle physics on the falling debris
 *  - gravityStrength     debris fall acceleration, px/s²
 *  - imageSampling       color debris with real top-image pixels (vs. plain pixel blocks)
 *  - showFallingBlocks   toggle debris entirely for a clean erase-only look
 */
export default function PixelRevealBackground({
  image = '',
  revealImage = '',
  pixelSize = 16,
  brushRadius = 60,
  healSpeed = 0.20,
  trailOpacity = 1,
  gravityEnabled = true,
  gravityStrength = 250,
  imageSampling = true,
  showFallingBlocks = true,
}) {
  const canvasRef = useRef(null);
  const originalRef = useRef(null);
  const pixelatedRef = useRef(null);
  const topMaskRef = useRef(null); // offscreen: top image with holes punched in it

  const trailMapRef = useRef(null); // erosion intensity per cell
  const gravOffsetRef = useRef(null); // y-drop in CSS px per cell
  const gravVelocityRef = useRef(null); // y-velocity in px/s per cell
  const sampledColorsRef = useRef(null); // RGBA per cell, sampled from the top image

  const animRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isHoverRef = useRef(false);
  const imgLoadedRef = useRef(false);
  const imgRef = useRef(null);
  const revealLoadedRef = useRef(false);
  const revealImgRef = useRef(null);
  const revealDimsRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const gridSizeRef = useRef({ w: 0, h: 0 });

  // Load the top (destructible) image
  useEffect(() => {
    if (!image) return;
    imgLoadedRef.current = false;
    const img = new Image();

    img.onload = () => {
      imgRef.current = img;
      imgLoadedRef.current = true;
      prepareCanvases();
    };
    img.src = image;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // Load the reveal (underneath) image
  useEffect(() => {
    if (!revealImage) {
      revealLoadedRef.current = false;
      revealImgRef.current = null;
      if (imgLoadedRef.current) prepareCanvases();
      return;
    }
    revealLoadedRef.current = false;
    const img = new Image();
    // No crossOrigin here — the reveal image is only ever drawn, never
    // sampled, so it doesn't need CORS headers on its host.
    img.onload = () => {
      revealImgRef.current = img;
      revealLoadedRef.current = true;
      prepareCanvases();
    };
    img.onerror = () => {
      revealLoadedRef.current = false;
      revealImgRef.current = null;
    };
    img.src = revealImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealImage]);

  // Size the canvases, draw the cover-fit images, build the pixelated
  // version, and pre-sample each cell's color from the top image.
  const prepareCanvases = useCallback(() => {
    const canvas = canvasRef.current;
    const original = originalRef.current;
    const pixelated = pixelatedRef.current;
    const img = imgRef.current;
    if (!canvas || !original || !pixelated || !img) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    sizeRef.current = { w, h };

    [canvas, original, pixelated].forEach((c) => {
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    });

    if (!topMaskRef.current) topMaskRef.current = document.createElement('canvas');
    topMaskRef.current.width = w * dpr;
    topMaskRef.current.height = h * dpr;

    // Draw the top image at DPR scale, cover-fit
    const origCtx = original.getContext('2d');
    if (!origCtx) return;
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }
    origCtx.save();
    origCtx.scale(dpr, dpr);
    origCtx.drawImage(img, drawX, drawY, drawW, drawH);
    origCtx.restore();

    // Cover-fit dims for the reveal image (drawn directly in the render loop)
    const revImg = revealImgRef.current;
    if (revImg && revealLoadedRef.current) {
      const rRatio = revImg.width / revImg.height;
      let rW, rH, rX, rY;
      if (rRatio > canvasRatio) {
        rH = h;
        rW = h * rRatio;
        rX = (w - rW) / 2;
        rY = 0;
      } else {
        rW = w;
        rH = w / rRatio;
        rX = 0;
        rY = (h - rH) / 2;
      }
      revealDimsRef.current = { x: rX, y: rY, w: rW, h: rH };
    }

    // Pixelated version: draw scaled-down onto a tiny canvas, then scale back up
    const pixCtx = pixelated.getContext('2d');
    if (!pixCtx) return;
    const gridW = Math.ceil(w / pixelSize);
    const gridH = Math.ceil(h / pixelSize);
    gridSizeRef.current = { w: gridW, h: gridH };

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = gridW;
    tempCanvas.height = gridH;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(img, drawX / (w / gridW), drawY / (h / gridH), drawW / (w / gridW), drawH / (h / gridH));

    pixCtx.save();
    pixCtx.scale(dpr, dpr);
    pixCtx.imageSmoothingEnabled = false;
    pixCtx.drawImage(tempCanvas, 0, 0, gridW, gridH, 0, 0, w, h);
    pixCtx.restore();

    // Init per-cell data maps
    const cellCount = gridW * gridH;
    trailMapRef.current = new Float32Array(cellCount).fill(0);
    gravOffsetRef.current = new Float32Array(cellCount).fill(0);
    gravVelocityRef.current = new Float32Array(cellCount).fill(0);

    // Pre-sample each cell's center pixel from the top image (used for debris color)
    const origData = origCtx.getImageData(0, 0, w * dpr, h * dpr);
    const origPixels = origData.data;
    const physW = w * dpr;
    const sampled = new Uint8ClampedArray(cellCount * 4);
    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        const cx = Math.min(Math.round((gx + 0.5) * pixelSize * dpr), physW - 1);
        const cy = Math.min(Math.round((gy + 0.5) * pixelSize * dpr), h * dpr - 1);
        const pIdx = (cy * physW + cx) * 4;
        const cIdx = (gy * gridW + gx) * 4;
        sampled[cIdx] = origPixels[pIdx];
        sampled[cIdx + 1] = origPixels[pIdx + 1];
        sampled[cIdx + 2] = origPixels[pIdx + 2];
        sampled[cIdx + 3] = 255;
      }
    }
    sampledColorsRef.current = sampled;

    // Initial frame: just the untouched top image
    const mainCtx = canvas.getContext('2d');
    if (!mainCtx) return;
    mainCtx.drawImage(original, 0, 0);
  }, [pixelSize]);

  useEffect(() => {
    if (imgLoadedRef.current) prepareCanvases();
  }, [prepareCanvases]);

  useEffect(() => {
    const onResize = () => {
      if (imgLoadedRef.current) prepareCanvases();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [prepareCanvases]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    isHoverRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoverRef.current = false;
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  // Main render loop: paint the trail, fade it, apply gravity, composite the frame
  useEffect(() => {
    if (!image) return;

    const render = () => {
      const canvas = canvasRef.current;
      const original = originalRef.current;
      const pixelated = pixelatedRef.current;
      const trailMap = trailMapRef.current;
      const gravOffset = gravOffsetRef.current;
      const gravVelocity = gravVelocityRef.current;
      const sampledColors = sampledColorsRef.current;

      if (!canvas || !original || !pixelated || !trailMap || !imgLoadedRef.current) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const { w, h } = sizeRef.current;
      const { w: gridW, h: gridH } = gridSizeRef.current;
      if (w === 0 || h === 0 || gridW === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const dt = 1 / 60;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Paint the trail under the cursor
      if (isHoverRef.current && mx > 0 && my > 0) {
        const gridX = Math.floor(mx / pixelSize);
        const gridY = Math.floor(my / pixelSize);
        const gridR = Math.ceil(brushRadius / pixelSize);
        for (let dy = -gridR; dy <= gridR; dy++) {
          for (let dx = -gridR; dx <= gridR; dx++) {
            const gx = gridX + dx;
            const gy = gridY + dy;
            if (gx < 0 || gx >= gridW || gy < 0 || gy >= gridH) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > gridR) continue;
            const falloff = 1 - dist / gridR;
            const idx = gy * gridW + gx;
            if (gravOffset && gravVelocity && trailMap[idx] < 0.15) {
              gravOffset[idx] = 0;
              gravVelocity[idx] = 0;
            }
            trailMap[idx] = Math.min(1, trailMap[idx] + falloff * 0.3);
          }
        }
      }

      // 2. Fade the trail + apply gravity physics
      const fadeAmount = healSpeed * dt;
      for (let i = 0; i < trailMap.length; i++) {
        if (trailMap[i] <= 0) continue;
        trailMap[i] = Math.max(0, trailMap[i] - fadeAmount);
        if (gravityEnabled && gravOffset && gravVelocity) {
          gravVelocity[i] += gravityStrength * dt;
          gravOffset[i] += gravVelocity[i] * dt;
        }
        if (trailMap[i] === 0 && gravOffset && gravVelocity) {
          gravOffset[i] = 0;
          gravVelocity[i] = 0;
        }
      }

      // 3. Composite the frame
      const mainCtx = canvas.getContext('2d');
      if (!mainCtx) {
        animRef.current = requestAnimationFrame(render);
        return;
      }
      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
      mainCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer 1: reveal image on the bottom
      const revImg = revealImgRef.current;
      if (revImg && revealLoadedRef.current && revImg.complete && revImg.naturalWidth > 0) {
        let d = revealDimsRef.current;
        if (d.w === 0 || d.h === 0) {
          const rRatio = revImg.width / revImg.height;
          const cRatio = w / h;
          let rW, rH, rX, rY;
          if (rRatio > cRatio) {
            rH = h;
            rW = h * rRatio;
            rX = (w - rW) / 2;
            rY = 0;
          } else {
            rW = w;
            rH = w / rRatio;
            rX = 0;
            rY = (h - rH) / 2;
          }
          revealDimsRef.current = { x: rX, y: rY, w: rW, h: rH };
          d = revealDimsRef.current;
        }
        mainCtx.drawImage(revImg, d.x * dpr, d.y * dpr, d.w * dpr, d.h * dpr);
      } else {
        mainCtx.fillStyle = '#000000';
        mainCtx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Layer 2: top image with holes punched in it (built on an offscreen
      // canvas — the destination-out punch must not touch the main canvas,
      // or it would erase the reveal layer underneath too)
      const topMask = topMaskRef.current;
      if (topMask) {
        const topCtx = topMask.getContext('2d');
        if (topCtx) {
          topCtx.globalAlpha = 1;
          topCtx.globalCompositeOperation = 'source-over';
          topCtx.clearRect(0, 0, topMask.width, topMask.height);
          topCtx.drawImage(original, 0, 0);

          topCtx.globalCompositeOperation = 'destination-out';
          for (let gy = 0; gy < gridH; gy++) {
            for (let gx = 0; gx < gridW; gx++) {
              const idx = gy * gridW + gx;
              const intensity = trailMap[idx];
              if (intensity < 0.01) continue;
              const sx = gx * pixelSize * dpr;
              const sy = gy * pixelSize * dpr;
              const sw = pixelSize * dpr;
              const sh = pixelSize * dpr;
              topCtx.globalAlpha = Math.min(1, intensity * 2);
              topCtx.fillRect(sx, sy, sw, sh);
            }
          }
          topCtx.globalAlpha = 1;
          topCtx.globalCompositeOperation = 'source-over';

          mainCtx.globalAlpha = 1;
          mainCtx.globalCompositeOperation = 'source-over';
          mainCtx.drawImage(topMask, 0, 0);
        }
      }

      // Falling debris: the torn-off pieces, drawn over everything
      if (showFallingBlocks) {
        mainCtx.globalCompositeOperation = 'source-over';
        for (let gy = 0; gy < gridH; gy++) {
          for (let gx = 0; gx < gridW; gx++) {
            const idx = gy * gridW + gx;
            const intensity = trailMap[idx];
            if (intensity < 0.01) continue;
            const sx = gx * pixelSize * dpr;
            const sy = gy * pixelSize * dpr;
            const sw = pixelSize * dpr;
            const sh = pixelSize * dpr;
            const dropY = gravityEnabled && gravOffset ? gravOffset[idx] * dpr : 0;
            const dx = sx;
            const dy = sy + dropY;
            mainCtx.globalAlpha = intensity * trailOpacity;
            if (imageSampling && sampledColors) {
              const cIdx = idx * 4;
              mainCtx.fillStyle = `rgb(${sampledColors[cIdx]}, ${sampledColors[cIdx + 1]}, ${sampledColors[cIdx + 2]})`;
              mainCtx.fillRect(dx, dy, sw, sh);
            } else {
              mainCtx.drawImage(pixelated, sx, sy, sw, sh, dx, dy, sw, sh);
            }
          }
        }
      }

      mainCtx.globalAlpha = 1;
      mainCtx.globalCompositeOperation = 'source-over';
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, revealImage, pixelSize, brushRadius, healSpeed, trailOpacity, gravityEnabled, gravityStrength, imageSampling, showFallingBlocks]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
      <canvas ref={originalRef} style={{ display: 'none' }} />
      <canvas ref={pixelatedRef} style={{ display: 'none' }} />
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {!image && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          Pass an "image" (and optional "revealImage") prop to get started
        </div>
      )}
    </div>
  );
}
