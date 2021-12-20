import { motion } from "framer-motion";
import { createElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileConnector, PropsWithReduxProfile } from "../redux/store";
import { FittedBox } from "./box";

export function User(props: {}) {
  return createElement(profileConnector(_User), props);
}

function _User(props: PropsWithReduxProfile) {
  const [state, setState] = useState({ closable: false, imageFilterRatio: 0, menuSticked: false });

  const refBody = useRef<HTMLDivElement>(null);
  const refProfileMenuObserver = useRef<HTMLDivElement>(null);
  const refProfileMenu = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const user = props.profile.selected || {};
  useEffect(() => {
    if (!props.profile.selected) {
      navigate('/', { replace: true });
    }
  });

  return (
    <>
      <div className="bg-black overflow-hidden pos-absolute w-100pc h-100pc" >
        <FittedBox.Img
          image={user?.profileImage || ''}
          style={{
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            filter: `grayscale(${state.imageFilterRatio}) blur(${state.imageFilterRatio * 10}px)`,
          }}
        />
      </div>

      <motion.div
        className="overflow-auto h-100pc text-white pos-relative"
        ref={refBody}
        onScroll={() => {
          const el = refBody.current;
          const scrollY = el?.scrollTop || 0;
          let imageFilterRatio = (scrollY / 200 < 1) ? (scrollY / 200) : 1;
          if (imageFilterRatio !== state.imageFilterRatio) {
            setState({ ...state, imageFilterRatio })
          }

          const elMenuObserver = refProfileMenuObserver.current;
          const menuSticked = !!(elMenuObserver && elMenuObserver.getBoundingClientRect().top <= 0);
          if (state.menuSticked !== menuSticked) {
            setState({ ...state, menuSticked });
          }
        }}
      >
        <FittedBox.Div className="text-white">
          <div
            className="pos-absolute bottom-50p left-15p w-40pc rounded-8p p-15p" style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <h5>{user?.name}</h5>
          </div>
        </FittedBox.Div>

        <div style={{minHeight: '100%'}}>
          <div
            ref={refProfileMenuObserver}
            className="pos-absolute" style={{ width: '100%', height: '1px' }}
          ></div>
          <ul
            ref={refProfileMenu}
            className="list-unstyled pos-sticky d-flex main-axis-center pt-30p pb-10p subtitle1"
            style={{ backdropFilter: (state.menuSticked ? 'blur(10px)' : undefined), zIndex: 2 }}
          >
            <li className="mx-15p">Profile</li>
            <li className="mx-15p">Feed</li>
          </ul>

          <div className="p-15p pos-relative text-white" >
            <p>{user?.description}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}