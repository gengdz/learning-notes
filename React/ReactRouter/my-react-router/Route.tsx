import React, { useContext } from "react";
import { RouterService } from "./Router";

type Props = {
  path: string;
  component: React.FunctionComponent | React.ComponentClass | string;
};

export default function Route(props: React.PropsWithChildren<Props>) {
  const { path, component } = props;
  const { location } = useContext(RouterService);
  if (location.pathname.match(path)) {
    return React.createElement(component);
  }
  return null;
}
