import { useEffect, useRef, useState } from 'react';

const lines = [
  'I’m Er, Md Sahjaan, a full-stack developer with three years of experience.',
  'I build backend features with Java and Spring Boot.',
  'I create React.js interfaces and integrate AI features into web applications.',
];
const finished = { line: lines.length, length: 0 };

export default function AboutIntroduction() {
  const intro = useRef(null);
  const [progress, setProgress] = useState({ line: 0, length: 0 });
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !window.IntersectionObserver) {
      setProgress(finished);
      return undefined;
    }

    let timer;
    let line = 0;
    let length = 0;
    function typeNext() {
      if (line === lines.length) {
        setProgress(finished);
        return;
      }
      if (length === lines[line].length) {
        line += 1;
        length = 0;
        timer = window.setTimeout(typeNext, 220);
        return;
      }
      length += 1;
      setProgress({ line, length });
      timer = window.setTimeout(typeNext, 18);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      typeNext();
    }, { threshold: 0.25 });
    observer.observe(intro.current);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={intro} className="portfolio-about-intro">
      {lines.map((text, index) => {
        const active = index === progress.line;
        const visible = index < progress.line ? text : active ? text.slice(0, progress.length) : '';
        return (
          <p className="portfolio-typed-line" key={text}>
            <span className="portfolio-typed-layout">{text}</span>
            <span aria-hidden="true">{visible}{active && progress.length > 0 && <span className="portfolio-typing-caret" />}</span>
          </p>
        );
      })}
    </div>
  );
}
