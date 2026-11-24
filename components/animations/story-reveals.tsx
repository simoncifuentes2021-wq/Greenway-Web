'use client';

import { useEffect } from 'react';

export function StoryReveals() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (media.matches) return;
        const animation = entry.target.animate([
          { opacity: .3, transform: 'translateY(18px)', clipPath: 'inset(0 0 12% 0)' },
          { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' },
        ], { duration: 720, easing: 'cubic-bezier(.23, 1, .32, 1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .18 });
    document.querySelectorAll('[data-story-heading]').forEach((heading) => observer.observe(heading));
    const stop = () => { if (media.matches) animations.forEach((animation) => animation.cancel()); };
    media.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); media.removeEventListener('change', stop); };
  }, []);
  return null;
}
