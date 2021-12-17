import { motion } from "framer-motion";
import { Component, createRef, CSSProperties, PointerEvent, PropsWithChildren, RefObject } from "react";

type PageViewDirection = 'x' | 'y';
interface PageViewProps {
  direction?: PageViewDirection;
  scrollable?: boolean;
  threshold?: number;
}

export class PageView extends Component<PropsWithChildren<PageViewProps>> {
 
  get el(): HTMLElement | null { return this._el.current; }
  get vertical(): boolean { return this.direction === 'y'; }
  get elLength(): number { return this.vertical ? this.el!.clientHeight || 0 : this.el!.clientWidth || 0; }

  private _el: RefObject<HTMLDivElement>;
  private direction: PageViewDirection;
  private threshold: number = 0.2;
  private current: number = 0;
  private initialScrollPosition: number = 0;
  private initialPointerPosition: number = 0;
  private lastPointerMoveData: {movement: number; timestamp: number} | null = null;
  private lastVelocity: number = 0;

  private touched: boolean = false;
  private scrolledByPointer = false;
  private animated: boolean = false;

  constructor(props: PageViewProps) {
    super(props);
    this._el = createRef();
    this.direction = props.direction !== undefined ? props.direction : 'y';
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
      }, time + 100);
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

  private onPointerDown = (e: PointerEvent) => {
    if(this.el && !this.animated) {
      this.touched = true;
      this.initialScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
      this.initialPointerPosition = this.vertical ? e.screenY : e.screenX;
    }
  }

  private onPointerMove = (e: PointerEvent) => {
    if(this.touched && this.el && this.props.scrollable ) {
      this.scrolledByPointer = true;
      const movement = (this.vertical ? e.screenY : e.screenX) - this.initialPointerPosition;
  
      this.el.scrollTo({
        ...this.vertical && {top : this.initialScrollPosition - movement},
        ...!this.vertical && {left: this.initialScrollPosition - movement}
      });

      this.lastVelocity = this.lastPointerMoveData ?( (movement - this.lastPointerMoveData.movement) / (e.timeStamp - this.lastPointerMoveData.timestamp)) : 0;
      this.lastPointerMoveData = {movement: movement, timestamp: e.timeStamp};
    }
  }

  private onPointerUp = (e: PointerEvent) => {
    if(this.el) {
      const currentScrollPosition = this.vertical ? this.el.scrollTop : this.el.scrollLeft;
      const movement = currentScrollPosition - this.initialScrollPosition;  
  
      if(this.touched && this.scrolledByPointer && movement !== 0) {
        const movementRatio = Math.abs(movement / this.elLength);
        const movementDirection = movement > 0 ? 1 : -1;

        let next: number;
  
        if (Math.abs(this.lastVelocity) > 0.5) {
          next = this.current + movementDirection;
        } else {
          next = this.current + (Math.floor(movementRatio) + (movementRatio % 1 >= this.threshold ? 1 : 0)) * movementDirection;
        }
        next = next <= 0 ? 0 : next >= this.el.children.length - 1 ? this.el.children.length - 1 : next;
        this.animateTo(next, next !== this.current ? 250 : 100);
  
        this.current = next;
      }
  
      this.touched = false;
      this.scrolledByPointer = false;
      this.lastVelocity = 0;
      this.lastPointerMoveData = null;
      this.initialScrollPosition = 0; 
    }
  }

  render() {
    const style: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
      touchAction: 'none',
      overflow: this.props.scrollable ? 'auto' : 'hidden',
      display: 'flex',
      flexDirection: this.vertical ? 'column' : 'row'
    };
    return (
      <motion.div 
      ref={this._el}
      style={style}
      onPointerDown={this.onPointerDown}
      onPointerMove={this.onPointerMove}
      onPointerUp={this.onPointerUp}
      onScroll={this.onScroll}
      >
        {this.props.children}
      </motion.div>
    )
  }
}

export class PageViewItem extends Component<PropsWithChildren<{}>> {
  render() {
    const style: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
      flex: '0 0 100%'
    }
    return (
      <div style={style}>
        {this.props.children}
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
