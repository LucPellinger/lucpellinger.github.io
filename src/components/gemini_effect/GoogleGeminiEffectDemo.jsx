import React from "react";
import { useScroll, useTransform } from "motion/react";
import GoogleGeminiEffect from "./geminiEffect";
import "./geminiEffect.css";

export default function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // keep 0..1 to make the draw obvious; you can overshoot to 1.2 later
  const a = useTransform(scrollYProgress, [0, 0.8], [0.2, 1]);
  const b = useTransform(scrollYProgress, [0, 0.8], [0.15, 1]);
  const c = useTransform(scrollYProgress, [0, 0.8], [0.1, 1]);
  const d = useTransform(scrollYProgress, [0, 0.8], [0.05, 1]);
  const e = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={ref} className="gge-demo gge-full-bleed">
      <GoogleGeminiEffect pathLengths={[a,b,c,d,e]}>
        <div className="gge-cta-layer">
            <button className="gge-cta">ui.aceternity.com</button>
        </div>
      </GoogleGeminiEffect>
    </div>
  );
}
