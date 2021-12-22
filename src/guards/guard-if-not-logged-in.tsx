import { createElement, PropsWithChildren, useEffect } from "react";
import { authConnector, PropsWithReduxAuth } from "../redux/store";

type Props = {
  onGuard: () => void;
}

interface _Props extends PropsWithReduxAuth, Props { }


export function GuardIfNotLoggedIn(props: PropsWithChildren<Props>) {
  return createElement(authConnector(_GuardIfNotLoggedIn), props);
}

function _GuardIfNotLoggedIn(props: PropsWithChildren<_Props>) {
  const guarded = props.auth.status !== 'loggedIn';
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