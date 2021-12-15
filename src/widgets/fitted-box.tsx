import { CSSProperties, PropsWithChildren } from "react"

const style: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
}

export const FittedBox = {
  div: (props: PropsWithChildren<IFittedBoxProps>) => {
    const _style: CSSProperties = {
      ...style,
      ...props.style && props.style,
    }
    return (
      <div style={_style}>
        {props.children}
      </div>
    )
  },

  img: (props: IFittedImageProps) => {
    const _style: CSSProperties = {
      ...style,
      ...props.style && props.style

    }

    const _draggable: boolean = !!props.draggable;

    return (
      <img 
      style={_style} 
      className={!_draggable ? 'disable-drag' : ''} 
      src={props.image} 
      alt={props.alt} 
      />
    )
  }
}

export interface IFittedBoxProps  {
  style?: CSSProperties;
}

export interface IFittedImageProps extends IFittedBoxProps {
  image: string;
  alt?: string;
  filter?: string;
  draggable?: boolean;
}

export * as FittedImage from './fitted-box';