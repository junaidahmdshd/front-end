import React from "react";
import { Routes } from "../app/Routes";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { ErrorBoundary } from "react-error-boundary";
import { LayoutSplashScreen } from "./Context/LayoutContext";
import ErrorFallback from "./components/Error/ErrorFallback";

export default function App({ basename }) {
  return (
    /** Error Boundary */
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      <React.Suspense fallback={<LayoutSplashScreen />}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <BrowserRouter basename={basename}>
          {/* Render routes with provided `Layout`. */}
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </BrowserRouter>
      </React.Suspense>
    </ErrorBoundary >
  );
}
