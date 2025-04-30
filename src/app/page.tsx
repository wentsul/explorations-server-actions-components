import { ClientDynamicComponent } from "@/components/client-dynamic-component";
import { ClientLoaderComponent } from "@/components/client-loader-component";

export default function Home() {
  return (
    <div className="min-h-svh min-w-svw flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <ClientLoaderComponent />
        <ClientDynamicComponent />
      </div>
    </div>
  );
}
