"use server";

import { ClientCounterComponent } from "@/components/client-counter-component";

// x blows up with
// Error: Could not find the module "[project]/src/components/client-counter-component.tsx#ClientCounterComponent" in the React Client Manifest. This is probably a bug in the React Server Components bundler.
export async function renderClientComponent() {
  return (
    <div className="flex flex-col gap-2">
      <div>Some server content</div>
      <ClientCounterComponent />
    </div>
  );
}
