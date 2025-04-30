"use server";

import { ClientCounterComponent } from "@/components/client-counter-component";

export async function renderCounterComponent() {
  return (
    <div className="flex flex-col gap-2">
      <div>Some server content</div>
      <ClientCounterComponent />
    </div>
  );
}

export async function renderDefaultCounterComponent(defaultCount: number) {
  return (
    <div className="flex flex-col gap-2">
      <div>Some server content</div>
      <ClientCounterComponent defaultCount={defaultCount} />
    </div>
  );
}
