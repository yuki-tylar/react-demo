import { createElement, PropsWithChildren, useEffect } from "react";
import { authConnector, PropsWithReduxAuth } from "../redux/store";

type Props = {
  onGuard: () => void;
}

interface _Props extends PropsWithReduxAuth, Props { }


export function GuardIfLoggedIn(props: PropsWithChildren<Props>) {
  return createElement(authConnector(_GuardIfLoggedIn), props);
}

function _GuardIfLoggedIn(props: PropsWithChildren<_Props>) {
  const guarded = props.auth.status === 'loggedIn';
  useEffect(() => {
    if (guarded) {
      props.onGuard();
    }
  });

  return (
    <>
      {
        guarded ? null : props.children
      }
    </>
  )
}