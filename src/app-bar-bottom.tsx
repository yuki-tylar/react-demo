import { AnimatePresence, motion } from "framer-motion";
import { Component, createElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authConnector, PropsWithReduxAuth } from "./redux/store";
import { FittedBox } from "./widgets/box";
import { icons } from "./_temp/icons";

export function AppBarBottom() {
  return createElement(authConnector(_AppBarBottom));
}
export function _AppBarBottom(props: PropsWithReduxAuth) {
  const location = useLocation();
  const [state, setState] = useState<{ isPostMenuShown: boolean }>({ isPostMenuShown: false });

  const togglePostMenu = () => {
    setState({ ...state, isPostMenuShown: !state.isPostMenuShown })
  }

  return (
    <>
      <AnimatePresence>
        {
          state.isPostMenuShown ?
            <motion.div
              className="post-menu pos-absolute bottom-100pc h-60p mb-10p rounded-8p overflow-hidden"
              style={{ width: '140px' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ul className="list-unstyled d-flex p-10p">
                <li style={{ flex: '0 0 50%' }}>
                  <Link
                    to='/new/post' style={{ color: 'inherit' }}
                    onClick={() => { togglePostMenu(); }}
                    state={{ background: location }}
                  >
                    <AppBarBottomIcon icon={icons.newPost} label="Moment"></AppBarBottomIcon>
                  </Link>
                </li>
                <li style={{ flex: '0 0 50%' }}>
                  <Link
                    to='/new/event'
                    style={{ color: 'inherit' }}
                    onClick={() => { togglePostMenu(); }}
                  >
                    <AppBarBottomIcon icon={icons.newEvent} label="Event"></AppBarBottomIcon>
                  </Link>
                </li>
              </ul>
            </motion.div> : null
        }
      </AnimatePresence>

      <ul className="bottom-bar-inner d-flex main-axis-between list-unstyled px-15p">
        <li className="text-center" style={{ flex: '1 0 20%' }}>
          <Link to='/' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={icons.stack} label="Explore" />
          </Link>
        </li>
        <li className="text-center" style={{ flex: '1 0 20%' }}>
          <Link to='/explore' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={icons.search} label="Search" />
          </Link>
        </li>
        {
          props.auth.status === 'loggedIn' ?
            <li className="text-center" style={{ flex: '1 0 20%' }}>
              <div
                onClick={() => { togglePostMenu(); }}
              >
                <AppBarBottomIcon icon={icons.plus} label="Post" />
              </div>
            </li> :
            null
        }
        <li className="text-center" style={{ flex: '1 0 20%' }}>
          <Link to='/message' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={icons.message} label="Message" />
          </Link>
        </li>
        {
          props.auth.status === 'loggedIn' ?
            <li className="text-center" style={{ flex: '1 0 20%' }}>
              <Link to='/my-profile' style={{ color: 'inherit' }}>
                <AppBarBottomIcon
                  icon={props.auth.data?.profileImage ? null : icons.profile}
                  image={props.auth.data?.profileImage}
                  label='Profile'
                />
              </Link>
            </li> :
            <li className="text-center" style={{ flex: '1 0 20%' }}>
              <Link to='/login' style={{ color: 'inherit' }}>
                <AppBarBottomIcon
                  icon={icons.profile}
                  label='Login'
                />
              </Link>
            </li>
        }
      </ul>
    </>
  );

}

class AppBarBottomIcon extends Component<{ icon?: string | null; image?: string, label: string; }> {
  render() {
    return (
      <div className="text-center">
        {
          this.props.icon ?
            <div
              className="d-inline-block w-20p icon"
              dangerouslySetInnerHTML={{ __html: this.props.icon }}
            ></div> : null
        }
        {
          this.props.image ?
            <div className="d-inline-block w-20p h-20p rounded-4p overflow-hidden">
              <FittedBox.Img image={this.props.image}></FittedBox.Img>
            </div> : null
        }
        <div className="caption body-small-md" style={{ userSelect: 'none' }}>{this.props.label}</div>
      </div>
    );
  }
}
