"use client";

import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
}

export function LazyLoad({ children, className = '' }: LazyLoadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {isVisible ? children : <div className="h-96" />}
    </div>
  );
}
