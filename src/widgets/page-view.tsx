import { Component, createRef, CSSProperties, PointerEvent, ReactElement, RefObject } from "react";

export enum PageViewDirection {
  horizontal,
  vertical
}

interface PageViewProps {
  children: ReactElement<PageViewItem>[];
  direction?: PageViewDirection;
  threshold?: number;
}

interface PageViewItemProps {
  child?: ReactElement;
}
export default class PageView extends Component<PageViewProps> {
 
  get el(): HTMLElement | null { return this._el.current; }
  get vertical(): boolean { return this.direction === PageViewDirection.vertical; }
  get elLength(): number { return this.vertical ? this.el!.clientHeight || 0 : this.el!.clientWidth || 0; }
  get movementRatio(): number { return Math.abs(this.movement / this.elLength); }
  get movementDirection(): 1 | -1 {return this.movement > 0 ? 1 : -1; }

  private _el: RefObject<HTMLDivElement>;
  private direction: PageViewDirection;
  private threshold: number = 0.2;
  private current: number = 0;
  private movement: number = 0;
  private initialScrollPosition: number = 0;
  private lastPointerMoveData: {movement: number; timestamp: number} | null = null;
  private lastVelocity: number = 0;

  private touched: boolean = false;
  private scrolledByPointer = false;
  private animated: boolean = false;

  constructor(props: PageViewProps) {
    super(props);
    this._el = createRef();
    this.direction = props.direction !== undefined ? props.direction : PageViewDirection.vertical;
    this.threshold = props.threshold !== undefined ? 
      props.threshold > 1 ? 1 : 
      props.threshold < 0 ? 0 :
      props.threshold : 
      0.3;
  }

  public animateTo(index: number = 0, duration: number = 200) {
    if(this.el) {
      let time = 0;

      const destination = index * this.elLength;
      const currentScroll = this.vertical ? this.el.scrollTop : this.el.scrollLeft;

      this.animated = true;
      while(time <= duration) {
        const scrollTo = currentScroll + Math.sin(time / duration * Math.PI / 2) * (destination - currentScroll);
        setTimeout((this.vertical? _scrollVerticalTo : _scrollHorizontalTo), time, this.el, scrollTo);
        time ++;
      }
      setTimeout(() => { 
        this.animated = false;
      }, time);
    }
  }

  public jumpTo(index: number = 0) {
    if(this.el) {
      const scrollTo = index * this.elLength;
      if(this.vertical) { _scrollVerticalTo(this.el, scrollTo); }
      else { _scrollHorizontalTo(this.el, scrollTo); }
    }
  }

  private _timerAutoScroll: any;
  onScroll = () => {
    if(!this.animated && !this.scrolledByPointer && this.el) {
      clearTimeout(this._timerAutoScroll);
      
      this._timerAutoScroll = setTimeout(() => {
        if(this.el){
          const currentScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
          let next = Math.round(currentScrollPosition / this.elLength);
          next = next <= 0 ? 0 : next >= this.el.children.length - 1 ? this.el.children.length - 1 : next;
          this.animateTo(next, 300);
          this.current = next;  
        }
      }, 250);
    }
  }

  private onPointerDown = () => {
    if(this.el) {
      this.touched = true;
      this.movement = 0;
      this.initialScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;  
    }
  }

  private onPointerMove = (e: PointerEvent) => {
    if(this.touched && this.el) {
      this.scrolledByPointer = true;
      
      const movement = this.vertical ? e.movementY : e.movementX;
  
      this.el.scrollBy({top: this.vertical ? -movement : 0, left: this.vertical ? 0 : -movement});

      this.lastVelocity = this.lastPointerMoveData ?( (movement - this.lastPointerMoveData.movement) / (e.timeStamp - this.lastPointerMoveData.timestamp)) : 0;
      this.lastPointerMoveData = {movement: movement, timestamp: e.timeStamp};
    }
  }

  private onPointerUp = () => {
    if(this.el) {
      const currentScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
      this.movement = currentScrollPosition - this.initialScrollPosition;  
  
      if(this.touched && this.scrolledByPointer && this.movement !== 0) {
        let next: number;
  
        if (Math.abs(this.lastVelocity) > 0.5) {
          next = this.current + this.movementDirection;
        } else {
          next = this.current + (Math.floor(this.movementRatio) + (this.movementRatio % 1 >= this.threshold ? 1 : 0)) * this.movementDirection;
        }
        next = next <= 0 ? 0 : next >= this.el.children.length - 1 ? this.el.children.length - 1 : next;
        this.animateTo(next, next !== this.current ? 300 : 100);
  
        this.current = next;
      }
  
      this.scrolledByPointer = false;
      this.touched = false;
      this.movement = 0;
      this.lastVelocity = 0;
      this.lastPointerMoveData = null;
      this.initialScrollPosition = 0; 
    }
  }

  render() {
    const style: CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      touchAction: 'none',
      overflow: 'auto',
      display: 'flex',
      flexDirection: this.vertical ? 'column' : 'row'
    };
    return (
      <div 
      ref={this._el}
      style={style}
      onPointerDown={this.onPointerDown}
      onPointerMove={this.onPointerMove}
      onPointerUp={this.onPointerUp}
      onScroll={this.onScroll}
      >
        {this.props.children}
      </div>
    )
  }
}

export class PageViewItem extends Component<PageViewItemProps> {
  render() {
    const style: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
      flex: '0 0 100%'
    }
    return (
      <div style={style}>
        {this.props.child}
      </div>
    )
  }
}

function _scrollVerticalTo(el: HTMLElement, to: number) {
  el.scrollTop = to;
}

function _scrollHorizontalTo(el: HTMLElement, to: number) {
  el.scrollLeft = to;
}
