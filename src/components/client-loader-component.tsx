"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { renderClientComponent } from "@/actions/server-action";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex flex-col gap-2">
      <h3>Error caught by boundary</h3>
      <p>{error.message}</p>
      <pre className="overflow-scroll">{error.stack}</pre>
    </div>
  );
}

export function ClientLoaderComponent() {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  function handleClick() {
    async function load() {
      const result = await renderClientComponent();
      if (result) {
        setComponent(result);
      }
    }

    load();
  }

  return (
    <ErrorBoundary errorComponent={ErrorComponent}>
      <div className="flex flex-col gap-2 border border-solid border-foreground p-4 rounded-2xl min-w-[500px]">
        <h3>Load client component via server action</h3>
        <Button onClick={handleClick}>test</Button>
        {!component ? "waiting" : component}
      </div>
    </ErrorBoundary>
  );
}
