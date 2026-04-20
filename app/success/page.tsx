"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessInner() {
  const params = useSearchParams();
  const reportId = params.get("reportId");
  const router = useRouter();
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const [message, setMessage] = useState(
    demoMode ? "Demo mode active. Opening your report..." : "Finalising your report..."
  );

  useEffect(() => {
    if (!reportId) return;

    if (demoMode) {
      router.replace(`/report/${reportId}`);
      return;
    }

    fetch(`/api/report/${reportId}/full`, { method: "POST" })
      .then(() => router.replace(`/report/${reportId}`))
      .catch(() =>
        setMessage("Payment succeeded, but the full report is still being prepared. Refresh shortly.")
      );
  }, [demoMode, reportId, router]);

  return (
    <div style={{ padding: "56px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{demoMode ? "Demo mode success" : "Thanks - payment received"}</h1>
      <p>{message}</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: "56px 24px" }}>Loading...</div>}>
      <SuccessInner />
    </Suspense>
  );
}