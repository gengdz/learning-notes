import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";

type Props = {};

export function getServiceToken<T>(
  useFunc: (...args: any) => T,
  initialData: T | undefined = undefined
) {
  return React.createContext(initialData as T);
}

const useRouterService = () => {
  const history = createBrowserHistory();
  const [location, setLocation] = useState(window.location);
  useEffect(() => {
    const unListen = history.listen(({ location: loc }) => {
      setLocation(loc as any);
    });
    return unListen;
  }, [history]);

  return {
    history,
    location
  };
};

export const RouterService = getServiceToken(useRouterService);

export default function Router(props: React.PropsWithChildren<Props>) {
  const { children } = props;
  const routerService = useRouterService();
  return (
    <RouterService.Provider value={routerService}>
      {children}
    </RouterService.Provider>
  );
}
