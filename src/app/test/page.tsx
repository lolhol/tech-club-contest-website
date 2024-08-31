"use client";

import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

export default function Test() {
  useEffect(() => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: '[data-intro="Hello step one!"]',
          intro: "This is the first step!",
        },
        {
          element: '[data-intro="Hello step two!"]',
          intro: "This is the second step!",
        },
      ],
      showStepNumbers: true,
      exitOnOverlayClick: false,
      showBullets: false,
      showButtons: true,
    });
    intro.start();
  }, []);

  return (
    <main className="w-full h-full text-black">
      <div
        className="w-96 h-20 ml-20 bg-slate-300"
        data-intro="Hello step one!"
      >
        abc
      </div>
      <div
        className="w-96 h-20 mt-20 ml-20 bg-slate-300"
        data-intro="Hello step two!"
      >
        def
      </div>
    </main>
  );
}
