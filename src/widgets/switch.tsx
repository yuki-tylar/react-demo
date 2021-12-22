import { motion } from "framer-motion";
import { Component, createElement } from "react";
import { readBuilderProgram } from "typescript";
import { rSettingAction } from "../redux/slice-settings";
import { PropsWithReduxSetting, settingConnector } from "../redux/store";

type Props = { isOn: boolean; onToggle:(isOn: boolean)=>void, width?: number, height?: number, gap?: number }
interface _Props extends Props, PropsWithReduxSetting { }

export function Switch(props: Props) {
  return createElement(settingConnector(_Switch), props);
}

export class _Switch extends Component<_Props, { isOn: boolean }> {
  constructor(props: _Props) {
    super(props);
    this.state = { isOn: props.isOn }
  }

  toggle() {
    const appearanceNext = this.props.isOn ? 'light' : 'dark';
    this.props.dispatch(rSettingAction.changeAppearance(appearanceNext));
  }

  render() {
    const width: number = this.props.width || 70;
    const height: number = this.props.height || 40;
    const gap: number = this.props.gap || 5
    const colorSwitch = this.props.setting.appearance == 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0,0,0,0.4)';
    const colorHandleOff = 'white';
    const colorHandleOn = this.props.setting.appearance == 'dark' ? '#FDB813' : '#4264D0';

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: colorSwitch,
          display: 'inline-flex',
          justifyContent: this.state.isOn ? 'flex-end' : 'flex-start',
          borderRadius: '10000px',
          padding: `${gap}px`,
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        onClick={() => {this.props.onToggle(!this.props.isOn); }}
      >
        <motion.div
          layout
          style={{
            width: `${height - gap * 2}px`,
            height: `${height - gap * 2}px`,
            borderRadius: '10000px',
            transition: 'background-color 200ms',
            backgroundColor: this.state.isOn ? colorHandleOn : colorHandleOff,
          }}
          transition={{
            type: 'spring',
            stiffness: width * 8,
            damping: width / 2.3,
          }}
        />
      </div >
    )

  }
}