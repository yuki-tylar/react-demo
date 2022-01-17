import { motion } from "framer-motion";
import { Component, createRef, RefObject } from "react";
import { FittedBox } from "../widgets/box";

type Props = {
  profile: any;
}

export class UserDetailUI extends Component<Props, {
  imageFilterRatio: number;
  menuSticked: boolean;
}>{
  private refBody: RefObject<HTMLDivElement>;
  private refProfileMenuObserver: RefObject<HTMLDivElement>;
  private refProfileMenu: RefObject<HTMLUListElement>;

  constructor(props: Props) {
    super(props);

    this.refBody = createRef<HTMLDivElement>();
    this.refProfileMenuObserver = createRef<HTMLDivElement>();
    this.refProfileMenu = createRef<HTMLUListElement>();

    this.state = {
      imageFilterRatio: 0,
      menuSticked: false,
    }
  }

  render() {
    return (
      <>
        <div className="bg-black overflow-hidden pos-absolute w-100pc h-100pc" >
          <FittedBox.Img
            image={this.props.profile?.profileImage || ''}
            style={{
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              filter: `grayscale(${this.state.imageFilterRatio}) blur(${this.state.imageFilterRatio * 10}px)`,
            }}
          />
        </div>

        <motion.div
          className="overflow-auto h-100pc text-white pos-relative"
          ref={this.refBody}
          onScroll={() => {
            const el = this.refBody.current;
            const scrollY = el?.scrollTop || 0;
            let imageFilterRatio = (scrollY / 200 < 1) ? (scrollY / 200) : 1;
            if (imageFilterRatio !== this.state.imageFilterRatio) {
              this.setState({ ...this.state, imageFilterRatio })
            }

            const elMenuObserver = this.refProfileMenuObserver.current;
            const menuSticked = !!(elMenuObserver && elMenuObserver.getBoundingClientRect().top <= 0);
            if (this.state.menuSticked !== menuSticked) {
              this.setState({ ...this.state, menuSticked });
            }
          }}
        >
          <FittedBox.Div className="text-white">
            <div
              className="pos-absolute bottom-50p left-15p w-40pc rounded-8p p-15p" style={{ background: 'rgba(0,0,0,0.2)' }}
            >
              <h5>{this.props.profile?.name}</h5>
            </div>
          </FittedBox.Div>

          <div style={{ minHeight: '100%' }}>
            <div
              ref={this.refProfileMenuObserver}
              className="pos-absolute" style={{ width: '100%', height: '1px' }}
            ></div>
            <ul
              ref={this.refProfileMenu}
              className="list-unstyled pos-sticky d-flex main-axis-center pt-30p pb-10p subtitle1"
              style={{ backdropFilter: (this.state.menuSticked ? 'blur(10px)' : undefined), zIndex: 2 }}
            >
              <li className="mx-15p">Profile</li>
              <li className="mx-15p">Feed</li>
            </ul>

            <div className="p-15p pos-relative text-white" >
              <p>{this.props.profile?.description}</p>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
}