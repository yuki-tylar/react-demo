import { AnimatePresence, motion } from "framer-motion";
import { Component, createElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authConnector, PropsWithReduxAuth } from "../redux/store";
import { FittedBox } from "../widgets/box";
import { BiCard, BiCalendarPlus, BiEdit, BiSearch, BiPlusCircle, BiMessageSquareDetail, BiUser, BiLogIn } from "react-icons/bi";
import { IconType } from 'react-icons';

export function TabBar() {
  return createElement(authConnector(_TabBar));
}
export function _TabBar(props: PropsWithReduxAuth) {
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
            <>
              <div
                className="pos-fixed top-0pc left-0pc w-100pc h-100pc"
                style={{ zIndex: 1 }}
                onClick={() => { setState({ ...state, isPostMenuShown: false }) }}
              ></div>

              <motion.div
                className="pos-absolute bottom-100pc rounded-8p overflow-hidden bg-white border-line"
                style={{ width: '160px', zIndex: 2, margin: '0 auto 10px', left: 0, right: 0}}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <ul className="list-unstyled d-flex p-15p">
                  <li style={{ flex: '0 0 50%' }} className="text-center">
                    <Link
                      to='/new/post' style={{ color: 'inherit' }}
                      onClick={() => { togglePostMenu(); }}
                      state={{ background: location }}
                    >
                      <AppBarBottomIcon icon={BiEdit} label="Moment"></AppBarBottomIcon>
                    </Link>
                  </li>
                  <li style={{ flex: '0 0 50%' }} className="text-center">
                    <Link
                      to='/new/event'
                      style={{ color: 'inherit' }}
                      onClick={() => { togglePostMenu(); }}
                      state={{ background: location }}
                    >
                      <AppBarBottomIcon icon={BiCalendarPlus} label="Event"></AppBarBottomIcon>
                    </Link>
                  </li>
                </ul>

              </motion.div>
            </>
            : null
        }
      </AnimatePresence>

      <ul className="d-flex main-axis-between list-unstyled p-15p d-md-block">
        <li className="text-center text-md-left" style={{ flex: '1 0 20%' }}>
          <Link to='/' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={BiCard} label="Explore" />
          </Link>
        </li>
        <li className="text-center text-md-left" style={{ flex: '1 0 20%' }}>
          <Link to='/search' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={BiSearch} label="Search" />
          </Link>
        </li>
        {
          props.auth.status === 'loggedIn' ?
            <li className="text-center text-md-left d-md-none" style={{ flex: '1 0 20%' }}>
              <div
                onClick={() => { togglePostMenu(); }}
              >
                <AppBarBottomIcon icon={BiPlusCircle} label="Post" />
              </div>
            </li> :
            null
        }
        <li className="text-center text-md-left" style={{ flex: '1 0 20%' }}>
          <Link to='/message' style={{ color: 'inherit' }}>
            <AppBarBottomIcon icon={BiMessageSquareDetail} label="Message" />
          </Link>
        </li>
        {
          props.auth.status === 'loggedIn' ?
            <li className="text-center text-md-left" style={{ flex: '1 0 20%' }}>
              <Link to='/my-profile' style={{ color: 'inherit' }}>
                <AppBarBottomIcon
                  icon={props.auth.data?.profileImage ? null : BiUser}
                  image={props.auth.data?.profileImage}
                  label='Profile'
                />
              </Link>
            </li> :
            <li className="text-center text-md-left" style={{ flex: '1 0 20%' }}>
              <Link to='/login' style={{ color: 'inherit' }}>
                <AppBarBottomIcon
                  icon={BiLogIn}
                  label='Login'
                />
              </Link>
            </li>
        }
      </ul>
    </>
  );

}

class AppBarBottomIcon extends Component<{ icon?: IconType | null; image?: string, label: string; }> {
  render() {
    return (
      <div className="d-md-flex cross-axis-center py-md-15p">
        {
          this.props.icon ?
            createElement(this.props.icon, { style: { fontSize: '22px' } }) : null
        }
        {
          this.props.image ?
            <div className="d-inline-block w-20p h-20p rounded-4p overflow-hidden">
              <FittedBox.Img image={this.props.image}></FittedBox.Img>
            </div> : null
        }
        <div
          className="body-small body1-md ml-md-15p"
          style={{ userSelect: 'none' }}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
