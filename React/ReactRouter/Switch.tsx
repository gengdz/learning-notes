import React, { useContext } from "react";
import { RouterService } from "./Router";

type Props = {};

export default function Switch(props: React.PropsWithChildren<any>) {
  const { children } = props;
  const { location } = useContext(RouterService);
  const childrens = Array.isArray(children) ? children : [children];

  for (let child of childrens) {
    if (location.pathname.match(child?.props?.path)) {
      return child;
    }
  }

  return null;
}
