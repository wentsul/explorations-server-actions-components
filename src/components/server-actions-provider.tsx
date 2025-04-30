"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type {
  renderCounterComponent,
  renderDefaultCounterComponent,
} from "@/actions/server-action";
import { createContext, PropsWithChildren, useContext } from "react";

interface ServerActionsContext {
  renderCounterComponent: typeof renderCounterComponent;
  renderDefaultCounterComponent: typeof renderDefaultCounterComponent;
}

export const ServerActionsContext = createContext<ServerActionsContext>({
  // @ts-expect-error can't set actual functions here.
  renderCounterComponent: null,
  // @ts-expect-error can't set actual functions here.
  renderDefaultCounterComponent: null,
});

export default ServerActionsContext;

export function useServerActions() {
  return useContext(ServerActionsContext);
}

export function useServerAction<Action extends keyof ServerActionsContext>(
  actionName: Action,
  ...args: Parameters<ServerActionsContext[Action]>
): UseQueryResult<Awaited<ReturnType<ServerActionsContext[Action]>>> {
  const actions = useServerActions();
  const action = actions[actionName];

  return useQuery({
    queryKey: ["server-actions", actionName, ...args],
    queryFn: async () => {
      // @ts-expect-error args is typed
      const component = await action(...args);
      return component;
    },
  });
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
