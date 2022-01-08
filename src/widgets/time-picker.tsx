import { motion } from "framer-motion";
import { Component, createRef, RefObject, useEffect, useRef, useState } from "react";

type Props = {
  initialValue?: Date;
  view24?: boolean;
  onChange: (time: { hour: number; min: number }) => void
}

export class TimePicker extends Component<Props, { isPM: boolean }> {
  private refH: RefObject<HTMLDivElement>
  private refM: RefObject<HTMLDivElement>
  private tileSize = 45;

  private hours: { label: number, value: number }[] = [];
  private mins: { label: number, value: number }[] = [];
  private time: { hour: number; min: number; };

  constructor(props: Props) {
    super(props);
    this.refH = createRef();
    this.refM = createRef();

    const now = new Date();
    let t = props.initialValue || new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0);
    let hour = t.getHours();
    let min = t.getMinutes();
    let _isPM = !props.view24 && hour >= 12;
    this.time = { hour: hour, min: min };
    this.state = { isPM: _isPM };

    props.onChange(this.time);
  }

  private setPM = (isPM: boolean) => {
    this.time.hour = this.time.hour + 12 * (isPM ? 1 : -1);
    if (this.time.hour < 0) {
      this.time.hour = this.time.hour + 12;
    } else if (this.time.hour >= 24) {
      this.time.hour = this.time.hour - 12;
    }
    this.props.onChange(this.time);

    this.setState({ isPM: isPM });
  }

  private onPan = (ref: RefObject<HTMLElement>, delta: number) => {
    if (ref.current) {
      ref.current.scrollBy({ top: - delta });
    }
  }

  private onSetTime = (type: 'hour' | 'minute', el: HTMLElement) => {
    const children = el.children;
    const parentY = el.getBoundingClientRect().top;
    let closest: { label: number, value: number };
    let minDistance = 1000;
    let def = 0;
    for (let i = 1; i < children.length - 1; i++) {
      const defFromCenter = (children[i].getBoundingClientRect().top - parentY) - this.tileSize;
      const val = this.hours[i - 1].value;
      if (minDistance > Math.abs(defFromCenter)) {
        minDistance = Math.abs(defFromCenter);
        def = defFromCenter;
        closest = (type == 'hour' ? this.hours : this.mins)[i - 1];
      }
    }

    if (type == 'hour') {
      this.time.hour = closest!.value
    } else if (type == 'minute') {
      this.time.min = closest!.value
    }

    this.props.onChange(this.time);

    let time = 0;
    let duration = 50;
    let currentScroll = el.scrollTop;
    let destination = currentScroll + def - 1;
    while (time <= duration) {
      const scrollTo = currentScroll + Math.sin(time / duration * Math.PI / 2) * (destination - currentScroll);
      setTimeout(_scrollVerticalTo, time, el, scrollTo);
      time++;
    }
  }

  componentDidMount() {
    const elH = this.refH.current;
    if (elH) {

      const idx = this.hours.findIndex(el => el.value == this.time.hour);
      elH.scrollTop = idx * this.tileSize;
    }

    const elM = this.refM.current;
    if (elM) {
      const idx = this.mins.findIndex(el => el.value == this.time.min);
      elM.scrollTop = idx * this.tileSize;
    }
  }

  render() {
    this.hours = _createCandidates('hour', 1, this.props.view24 || false, this.state.isPM);
    this.mins = _createCandidates('minute', 15);
    return (
      <div className="d-flex time-picker main-axis-center">
        <motion.div
          ref={this.refH}
          className='slot'
          style={{ overflow: 'hidden', touchAction: 'none', userSelect: 'none', height: this.tileSize * 3 + 'px' }}
          onPan={(e, info) => { this.onPan(this.refH, info.delta.y); }}
          onPanEnd={() => { this.onSetTime('hour', this.refH.current!) }}
        >
          <div key="hour-before" style={{ height: this.tileSize + 'px' }}></div>
          {
            this.hours.map((el, index) =>
              <div
                key={el.label}
                className="text-center"
                style={{
                  lineHeight: this.tileSize + 'px',
                }}
              >
                {el.label}
              </div>
            )
          }
          <div key="hour-after" style={{ height: this.tileSize + 'px' }}></div>
        </motion.div>

        <div className="mx-15p">:</div>

        <motion.div
          ref={this.refM}
          className='slot'
          style={{ overflow: 'hidden', touchAction: 'none', userSelect: 'none', height: this.tileSize * 3 + 'px' }}
          onPan={(e, info) => { this.onPan(this.refM, info.delta.y); }}
          onPanEnd={() => { this.onSetTime('minute', this.refM.current!) }}
        >
          <div key="minute-before" style={{ height: this.tileSize + 'px' }}></div>
          {
            this.mins.map((el, index) =>
              <div
                key={el.label}
                className="text-center"
                style={{
                  lineHeight: this.tileSize + 'px',
                }}
              >
                {el.label}
              </div>
            )
          }
          <div key="minute-after" style={{ height: this.tileSize + 'px' }}></div>
        </motion.div>
        <div className="mx-15p"></div>

        <div>
          <div
            className={`ampm ${!this.state.isPM ? 'selected' : ''}`}
            onClick={() => { this.setPM(false); }}
          >
            AM
          </div>
          <div
            className={`mt-10p ampm ${this.state.isPM ? 'selected' : ''}`}
            onClick={() => { this.setPM(true); }}
          >
            PM
          </div>
        </div>
      </div>
    );
  }
}


function _createCandidates(type: 'minute' | 'hour', step: number = 1, view24: boolean = false, isPM: boolean = false) {
  const candidates = [];
  let i = 0;
  let num = 0;
  let len = 0;

  if (type == 'hour') {
    len = view24 ? 24 : 12;

  } else if (type == 'minute') {
    len = 60;
  }

  while (i < len) {
    candidates.push({
      label: type == 'hour' && isPM && num == 0 ? 12 : num,
      value: type == 'hour' && isPM ? num + 12 : num,
    })
    num = num + step;
    i = i + step
  }
  return candidates;
}

function _scrollVerticalTo(el: HTMLElement, to: number) {
  el.scrollTop = to;
}

