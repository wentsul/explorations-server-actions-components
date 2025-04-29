"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function ClientCounterComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  );
}
