"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function ClientCounterComponent({
  defaultCount = 0,
}: {
  defaultCount?: number;
}) {
  const [count, setCount] = useState(defaultCount);
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  );
}
