'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
}

export default function Typewriter({ words }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (!words || words.length === 0) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500); // Hold word
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 90); // typing vs deleting speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  // Cursor blink effect
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <span className="text-primary-main font-semibold">
      {words && words.length > 0 ? words[index].substring(0, subIndex) : ''}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 text-primary-main`}>
        |
      </span>
    </span>
  );
}
