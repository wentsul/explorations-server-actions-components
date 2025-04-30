"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { useServerActions } from "./server-actions-provider";

export function ClientLoaderComponent() {
  const [component, setComponent] = useState<JSX.Element | null>(null);
  const { renderClientComponent } = useServerActions();

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
    <div className="flex flex-col gap-2 border border-solid border-foreground p-4 rounded-2xl min-w-[500px]">
      <h3>Load client component via server action</h3>
      <Button onClick={handleClick}>test</Button>
      {!component ? "waiting" : component}
    </div>
  );
}
