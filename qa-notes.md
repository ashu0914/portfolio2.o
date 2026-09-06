# Browser QA notes

The Home route renders the new nav, paper-and-ink layout, generated hero image, Jaya AI stamp, and footer. The first preview showed the hero title hidden because the motion parent stayed `visibility: hidden` after the word split; the hook was corrected by setting the motion heading parent to `autoAlpha: 1` before animating child words. The generated hero placeholder resolved to the intended notebook/instrument still life on the next browser view. No browser console errors were reported.

The reloaded Home route now shows the full hero headline with the intended word-level reveal setup. The Skills route renders the page intro, asymmetric index layout, system-atlas artwork, and route CTA without console errors; the above-the-fold composition remains readable and the generated illustration is visible.

The Certifications route renders its evidence-led intro and keeps the supplied Google certificate and both direct Coursera verification paths in the page data. The Contact route renders the collaboration intro, generated desk artwork, social/email links, and mailto inquiry flow. Both routes remain readable above the fold and share the same navigation/footer spine.
