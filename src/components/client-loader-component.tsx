"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { renderClientComponent } from "@/actions/server-action";

export function ClientLoaderComponent() {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  function handleClick() {
    async function load() {
      const result = await renderClientComponent();
      console.log({ result });
      if (result) {
        setComponent(result);
      }
    }

    load();
  }

  return (
    <>
      <Button onClick={handleClick}>test</Button>
      {!component ? "waiting" : component}
    </>
  );
}
