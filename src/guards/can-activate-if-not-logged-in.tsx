import { createElement, PropsWithChildren, useEffect } from "react";
import { authConnector, PropsWithReduxAuth } from "../redux/store";

type Props = {
  onGuard: () => void;
}

interface _Props extends PropsWithReduxAuth, Props { }


export function CanActivateIfNotLoggedIn(props: PropsWithChildren<Props>) {
  return createElement(authConnector(_CanActivateIfNotLoggedIn), props);
}

function _CanActivateIfNotLoggedIn(props: PropsWithChildren<_Props>) {
  let canActivate = props.auth.status !== 'loggedIn';

  useEffect(() => {
    if(!canActivate) {
      props.onGuard();
    }
  });

  return (
    <>
      {
        canActivate ? props.children : null
      }
    </>
  )
}