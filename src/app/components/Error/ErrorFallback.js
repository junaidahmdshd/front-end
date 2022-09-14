import React, { useEffect } from "react";
import { setWithExpiry, getWithExpiry } from "../../utils/ErrorFunctions";
export default function ErrorFallback({ error, resetErrorBoundary }) {
  // Handle failed lazy loading of a JS/CSS chunk.
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry("chunk_failed")) {
        setWithExpiry("chunk_failed", "true", 5000);
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="text-center pt-28">
      <p>Something went wrong.</p>
      <pre>{error?.message}</pre>
      <button className="btn btn-primary" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
