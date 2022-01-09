import { Component, createRef, PropsWithChildren, RefObject } from "react";

type Props = PropsWithChildren<{
  onClickOutside: () => void;
}>
export class ClickOutsideDetector extends Component<Props> {
  private ref: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.ref = createRef();
  }
  componentDidMount() {
    document.addEventListener('click', this.clickOutsideHandler);
    console.log(this.ref)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutsideHandler);
  }

  private clickOutsideHandler = (e: Event) => {
    if(this.ref?.current && !this.ref.current.contains(e.target as Node)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return (
      <div ref={this.ref}>
        {this.props.children}
      </div>
    );
  }
}