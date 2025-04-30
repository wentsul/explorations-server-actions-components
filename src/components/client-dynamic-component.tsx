"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const DynamicClientCounter = dynamic(
  () =>
    import("./client-counter-component").then(
      (mod) => mod.ClientCounterComponent,
    ),
  {
    loading: () => <p>Loading...</p>,
  },
);

export function ClientDynamicComponent() {
  const [load, setLoad] = useState(false);

  function handleClick() {
    setLoad(true);
  }

  return (
    <div className="flex flex-col gap-2 border border-solid border-foreground p-4 rounded-2xl min-w-[500px]">
      <h3>Load client component via next dynamic</h3>
      <Button onClick={handleClick}>test</Button>
      {load ? <DynamicClientCounter /> : null}
    </div>
  );
}
