"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallbackHref: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  fallbackHref,
  label = "Back",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  function goBack() {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromThisSite = referrer?.origin === window.location.origin;

    if (cameFromThisSite && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref as any);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className={[
        "inline-flex items-center gap-1.5 text-sm opacity-80 transition hover:opacity-100 hover:underline",
        className,
      ].join(" ")}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
