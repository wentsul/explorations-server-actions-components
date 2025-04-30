"use client";

import type { renderClientComponent } from "@/actions/server-action";
import { createContext, PropsWithChildren, useContext } from "react";

interface ServerActionsContext {
  renderClientComponent: typeof renderClientComponent;
}

export const ServerActionsContext = createContext<ServerActionsContext>({
  // @ts-expect-error can't set actual functions here.
  renderClientComponent: null,
});

export default ServerActionsContext;

export function useServerActions() {
  return useContext(ServerActionsContext);
}

export function ServerActionsProvider({
  value,
  children,
}: PropsWithChildren<{ value: ServerActionsContext }>) {
  return (
    <ServerActionsContext.Provider value={value}>
      {children}
    </ServerActionsContext.Provider>
  );
}
