"use server";

import dynamic from "next/dynamic";
import { ClientCounterComponent } from "@/components/client-counter-component";

const DynamicClientCounter = dynamic(() => import('@/components/client-counter-component').then(mod => mod.ClientCounterComponent), {
  loading: () => <p>Loading...</p>
})

// x
export async function renderClientComponent() {
  return (
    <div className="flex flex-col gap-2">
      <div>Some server content</div>
      <ClientCounterComponent />
    </div>
  );
}

// x
export async function renderDynamicClientComponent() {
  return <DynamicClientCounter />;
}
