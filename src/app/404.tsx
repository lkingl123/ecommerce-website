"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  const searchParams = useSearchParams(); // ✅ Now inside <Suspense>

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-gray-500 text-lg mt-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
}
