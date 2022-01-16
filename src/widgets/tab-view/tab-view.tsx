import { Component, CSSProperties, PropsWithChildren, ReactNode } from "react";
import './tab-view.scss';

type Props = PropsWithChildren<{
  tabBar: ReactNode;
  responsive?: boolean;

  style?: CSSProperties;
  className?: string | string[];

  classNameTabBar?: string | string[];
  styleTabBar?: CSSProperties;

  classNameBody?: string | string[];
  styleBody?: CSSProperties;
}>

function getClassNameList(base: string[], additional: string[] | string | undefined): string {
  if (additional) {
    if (typeof additional == 'string') {
      base.push(additional);
    } else {
      base = base.concat(additional);
    }
  }
  return base.join(' ');
}

export class TabView extends Component<Props> {

  private containerClassName: string;
  private tabBarClassName: string;

  private bodyClassName: string;

  constructor(props: Props) {
    super(props);
    const containerClass = ['yt-tab-view', ... props.responsive ? ['yt-tab-view-responsive'] : []];
    this.containerClassName = getClassNameList(containerClass, this.props.className);
    this.tabBarClassName = getClassNameList(['yt-tab-view__tab-bar'], this.props.classNameTabBar);
    this.bodyClassName = getClassNameList(['yt-tab-view__body'], this.props.classNameBody);
  }


  render() {
    return (
      <div
        style={this.props.style}
        className={this.containerClassName}
      >

        <div className={this.bodyClassName}>
          {this.props.children}
        </div>
        <div
          style={this.props.styleTabBar}
          className={this.tabBarClassName}
        >
          {this.props.tabBar}
        </div>
      </div>
    );
  }
}