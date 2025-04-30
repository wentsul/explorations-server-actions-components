"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { useServerAction, useServerActions } from "./server-actions-provider";

export function ClientLoaderComponent() {
  const [component, setComponent] = useState<JSX.Element | null>(null);
  const { renderCounterComponent } = useServerActions();
  const {
    data: CounterComponent,
    isLoading,
    error,
  } = useServerAction("renderDefaultCounterComponent", 5);

  function handleClick() {
    async function load() {
      const result = await renderCounterComponent();
      if (result) {
        setComponent(result);
      }
    }

    load();
  }

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 border border-solid border-foreground p-4 rounded-2xl min-w-[500px]">
        <h3>Load client component via server action</h3>
        <Button onClick={handleClick}>test</Button>
        {!component ? "click to load" : component}
      </div>

      <div className="flex flex-col gap-2 border border-solid border-foreground p-4 rounded-2xl min-w-[500px]">
        <h3>Autoload client component via useServerAction</h3>
        {isLoading ? "loading" : CounterComponent}
      </div>
    </div>
  );
}
