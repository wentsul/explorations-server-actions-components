import {
  renderCounterComponent,
  renderDefaultCounterComponent,
} from "@/actions/server-action";
import { ClientLoaderComponent } from "@/components/client-loader-component";
import { ServerActionsProvider } from "@/components/server-actions-provider";

export default function Home() {
  return (
    <div className="min-h-svh min-w-svw flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <ServerActionsProvider
          value={{ renderCounterComponent, renderDefaultCounterComponent }}
        >
          <ClientLoaderComponent />
        </ServerActionsProvider>
      </div>
    </div>
  );
}
