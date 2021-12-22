import { createElement, PropsWithChildren, useEffect } from "react";
import { authConnector, PropsWithReduxAuth } from "../redux/store";

type Props = {
  onGuard: () => void;
}

interface _Props extends PropsWithReduxAuth, Props { }


export function CanActivateIfLoggedIn(props: PropsWithChildren<Props>) {
  return createElement(authConnector(_CanActivateIfLoggedIn), props);
}

function _CanActivateIfLoggedIn(props: PropsWithChildren<_Props>) {
  let canActivate = props.auth.status === 'loggedIn';

  useEffect(() => {
    if(props.auth.status === 'notChecked' || props.auth.status === 'checking') {
    } else if(props.auth.status === 'loggedIn') {
      canActivate = true;
    } else {
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