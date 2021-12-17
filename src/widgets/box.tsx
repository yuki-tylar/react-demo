import { Component, CSSProperties, PropsWithChildren } from "react"

export class AspectRatio extends Component<PropsWithChildren<{ratio: number}>> {
  render() {
    return (
      <div className="pos-relative">
        {this.props.children}
        <div style={{paddingTop: this.props.ratio * 100 + '%'}}></div>
      </div>
    )
  }
}
const styleFittedBox: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
}


export const FittedBox = {
  Div: (props: PropsWithChildren<IFittedBoxProps>) => {
    const _style: CSSProperties = {
      ...styleFittedBox,
      ...props.style && props.style,
    }
    return (
      <div style={_style} className={props.className}>
        {props.children}
      </div>
    )
  },

  Img: (props: IFittedImageProps) => {
    const _style: CSSProperties = {
      ...styleFittedBox,
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
  className?: string;
}

export interface IFittedImageProps extends IFittedBoxProps {
  image: string;
  alt?: string;
  filter?: string;
  draggable?: boolean;
}

export * as FittedImage from './box';