"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type {
  renderCounterComponent,
  renderDefaultCounterComponent,
} from "@/actions/server-action";
import { createContext, JSX, PropsWithChildren, useContext } from "react";

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
  props: Parameters<ServerActionsContext[Action]>[0],
): UseQueryResult<Awaited<ReturnType<ServerActionsContext[Action]>>> {
  const actions = useServerActions();
  const action = actions[actionName];

  return useQuery({
    queryKey: ["server-actions", actionName, props],
    queryFn: async () => {
      // @ts-expect-error args is typed
      const component = await action(props);
      return component;
    },
  });
}

export function dynamicServerComponent<
  Action extends keyof ServerActionsContext,
>(
  actionName: Action,
  options: {
    loading?: () => JSX.Element;
  } = {},
) {
  function DynamicServerComponent(
    props: Parameters<ServerActionsContext[Action]>[0],
  ): JSX.Element | null {
    const { data, isLoading } = useServerAction(actionName, props);
    if (isLoading) {
      return options.loading?.() ?? null;
    }

    if (!data) {
      return null;
    }

    return data;
  }

  return DynamicServerComponent;
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
