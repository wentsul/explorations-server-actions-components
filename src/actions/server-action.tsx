"use server";

import { ClientCounterComponent } from "@/components/client-counter-component";

export async function renderClientComponent() {
  return (
    <div className="flex flex-col gap-2">
      <div>Some server content</div>
      <ClientCounterComponent />
    </div>
  );
}
