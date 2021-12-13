import { CSSProperties } from "react"

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',  
}


export const Cover = (props: FittedImageProps) => {
  const _style: CSSProperties = {
    ...style,
    objectFit: 'cover',
    ...props.filter && {filter: props.filter}
  };

  const _draggable: boolean = props.draggable === false ? false : true;

  return (
    <img 
    style={_style} 
    className={!_draggable ? 'disable-drag' : ''} 
    src={props.image} 
    alt={props.alt} 
    />
  )
}


export const Contain = (props: FittedImageProps) => {
  const _style: CSSProperties = {
    ...style,
    objectFit: 'contain',
    ...props.filter && {filter: props.filter}
  };

  const _draggable: boolean = props.draggable === false ? false : true;

  return (
    <img 
    style={_style} 
    className={!_draggable ? 'disable-drag' : ''} 
    src={props.image} 
    alt={props.alt} 
    />
  )
}

export interface FittedImageProps {
  image: string;
  alt?: string;
  filter?: string;
  draggable?: boolean;
}

export * as FittedImage from './fitted-image';