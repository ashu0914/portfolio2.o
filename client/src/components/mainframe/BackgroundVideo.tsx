import { useEffect, useRef } from "react";

const SENSITIVITY = 0.8;
const VIDEO_SRC = `${import.meta.env.BASE_URL}images/mainframe-hero.mp4`;

export default function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const prevXRef = useRef<number | null>(null);
    const targetTimeRef = useRef(0);
    const pendingSeekRef = useRef(false);

    useEffect(() => {
    const video = videoRef.current;
        if (!video) return;

    const seekTo = (time: number) => {
        targetTimeRef.current = time;
        if (!pendingSeekRef.current) {
        pendingSeekRef.current = true;
        video.currentTime = time;
        }
    };

    const handleSeeked = () => {
        if (targetTimeRef.current !== video.currentTime) {
            video.currentTime = targetTimeRef.current;
        } else {
        pendingSeekRef.current = false;
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        const duration = video.duration;
        if (!duration || Number.isNaN(duration)) return;

        const currentX = event.clientX;
        if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
        }

        const delta = currentX - prevXRef.current;
        prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
        const nextTarget = Math.min(
        Math.max((pendingSeekRef.current ? targetTimeRef.current : video.currentTime) + timeOffset, 0),
        duration
        );

        seekTo(nextTarget);
    };

    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
        video.removeEventListener("seeked", handleSeeked);
        window.removeEventListener("mousemove", handleMouseMove);
    };
    }, []);

    return (
    <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
    />
    );
}
