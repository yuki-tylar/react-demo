import { FunctionComponentElement, PropsWithChildren } from "react";

export type RouteItem = {
  path: string;
  element?: JSX.Element;
  component?: ComponentType;
  data?: { [k: string]: any };
  children?: RouteItem[];
}

export interface RouteFeedItem extends RouteItem {
  component: ComponentType;
  data: { 
    title: string, 
    darkmode?: boolean; 
  };
}

type ComponentType = (props:PropsWithChildren<any>)=> FunctionComponentElement<PropsWithChildren<any>>;