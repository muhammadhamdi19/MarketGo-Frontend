import React, { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'; 

const Shapes = () => {
  const layeredAnimationRef = useRef(null);
  const shapeRefs = useRef([]);

  useEffect(() => {
    // Function to fit the element to its parent
    const fitElementToParent = (el, padding = 0) => {
      anime.set(el, { scale: 1 });
      const parentEl = el.parentNode;
      const elOffsetWidth = el.offsetWidth - padding;
      const parentOffsetWidth = parentEl.offsetWidth;
      const ratio = parentOffsetWidth / elOffsetWidth;
      anime.set(el, { scale: ratio });
    };

    const layeredAnimationEl = layeredAnimationRef.current;
    fitElementToParent(layeredAnimationEl);

    // Debounced resize handler to improve performance
    const handleResize = () => fitElementToParent(layeredAnimationEl);
    const debouncedHandleResize = debounce(handleResize, 200);
    window.addEventListener('resize', debouncedHandleResize);

    // List of easing functions for animations
    const easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];

    // Create keyframes for the animations
    const createKeyframes = (value) => Array(30).fill({ value });

    // Animation logic for each shape
    const animateShape = (el) => {
      const circleEl = el.querySelector('circle');
      const rectEl = el.querySelector('rect');
      const polyEl = el.querySelector('polygon');

      const animation = anime.timeline({
        targets: el,
        duration: () => anime.random(600, 2200),
        easing: () => easings[anime.random(0, easings.length - 1)],
        complete: (anim) => animateShape(anim.animatables[0].target),
      })
      .add({
        translateX: createKeyframes(() => el.classList.contains('large') ? anime.random(-300, 300) : anime.random(-520, 520)),
        translateY: createKeyframes(() => el.classList.contains('large') ? anime.random(-110, 110) : anime.random(-280, 280)),
        rotate: createKeyframes(() => anime.random(-180, 180)),
      }, 0);

      // Circle animation
      if (circleEl) {
        animation.add({ targets: circleEl, r: createKeyframes(() => anime.random(32, 72)) }, 0);
      }

      // Rectangle animation
      if (rectEl) {
        animation.add({
          targets: rectEl,
          width: createKeyframes(() => anime.random(48, 96)),
          height: createKeyframes(() => anime.random(48, 96)),
        }, 0);
      }

      // Polygon animation
      if (polyEl) {
        const originalPoints = polyEl.getAttribute('points').split(' ');

        animation.add({
          targets: polyEl,
          points: createKeyframes(() => {
            const scale = anime.random(72, 180) / 100;
            const newPoints = originalPoints.map((p) => {
              const coords = p.split(',');  // Split x and y coordinates
              if (coords.length === 2) {
                const x = parseFloat(coords[0]) * scale;
                const y = parseFloat(coords[1]) * scale;
                return `${x},${y}`;  // Return the scaled point
              }
              return p;  // Return the original point if it is malformed
            });
            return newPoints.join(' ');  // Join points back into a string
          }),
        }, 0);
      }
    };

    // Start animation for all shapes
    shapeRefs.current.forEach(animateShape);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  // Debounce function to limit resize event frequency
  const debounce = (func, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => func(), delay);
    };
  };

  return (
    <div className="w-4/5 pb-[40%] absolute " ref={layeredAnimationRef}>
        <div className="absolute top-1/2 left-1/2 flex items-center justify-center w-[1100px] h-[550px] -mt-[275px] -ml-[550px] layered-animations">
          {/* Circle Shape */}
          <svg
            ref={(el) => (shapeRefs.current[0] = el)}
            className="absolute top-1/2 overflow-visible w-[280px] h-[280px] -mt-[140px] stroke-transparent fill-[url(#circleGradient)]"
            viewBox="0 0 96 96"
          >
            <defs>
              <linearGradient id="circleGradient" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop stopColor="#373734" offset="0%" />
                <stop stopColor="#242423" offset="50%" />
                <stop stopColor="#0D0D0C" offset="100%" />
              </linearGradient>
            </defs>
            <circle cx="48" cy="48" r="28" />
          </svg>

          {/* Triangle Shape */}
          <svg
            ref={(el) => (shapeRefs.current[1] = el)}
            className="absolute top-1/2 overflow-visible w-16 h-16 -mt-8 stroke-current fill-current text-[#BE975B]"
            viewBox="0 0 96 96"
          >
            <polygon points="48 17.28 86.4 80.11584 9.6 80.11584" />
          </svg>

          {/* Rectangle Shape */}
          <svg
            ref={(el) => (shapeRefs.current[2] = el)}
            className="absolute top-1/2 overflow-visible w-[120px] h-[120px] -mt-12 stroke-current fill-current text-[#938677]"
            viewBox="0 0 96 96"
          >
            <rect width="48" height="48" x="24" y="24" />
          </svg>
        </div>
      </div>
  )
}

export default Shapes