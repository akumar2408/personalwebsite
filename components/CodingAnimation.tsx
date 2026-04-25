"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const animationPaths = {
  coding: "/site/coding.json",
  programmer: "/site/programmer.json",
};

export default function CodingAnimation({
  type = "coding",
  className = "",
}: {
  type?: keyof typeof animationPaths;
  className?: string;
}) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch(animationPaths[type])
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted) setAnimationData(data);
      })
      .catch(() => {
        if (mounted) setAnimationData(null);
      });

    return () => {
      mounted = false;
    };
  }, [type]);

  if (!animationData) {
    return <div className={`h-full w-full ${className}`} aria-hidden="true" />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className={`h-full w-full ${className}`}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      aria-label={type === "coding" ? "Animated coding workspace" : "Animated programmer workspace"}
    />
  );
}
