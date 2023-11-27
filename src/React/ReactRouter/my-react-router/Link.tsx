import React, { useContext } from "react";
import { RouterService } from "./Router";

type Props = {
  to: string;
};

type AProps = React.AnchorHTMLAttributes<HTMLElement>;

export default function Link(props: React.PropsWithChildren<Props>) {
  const { to, children } = props;
  const { history } = useContext(RouterService);

  const onClick: AProps["onClick"] = (e) => {
    e.preventDefault();
    history.push(to);
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}
