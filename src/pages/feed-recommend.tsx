import { AnimatePresence, AnimateSharedLayout, motion, useDragControls } from "framer-motion";
import { useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { gestureService } from "../service/gesture-service";
import { Card } from "../widgets/card";
import { ChildView } from "../widgets/child-view-container";
import { Overlay } from "../widgets/overlay";
import { PageView, PageViewItem } from "../widgets/page-view";
import { contents } from "../_temp/contents";
import { User } from "./user";


const variantsForOverlay = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  }
}

const variantsForUserView = {
  enter: (height: number) => {
    return {
      y: 100,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (height: number) => {
    return {
      y: 100,
      opacity: 0,
      zIndex: 1,
    }
  },
}


export function FeedRecommend(props: { scrollable: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace(/^\/|\/$/g, '').split('/');
  let userId: string;
  if (path.length >= 3 && path[1] == 'user') {
    userId = path[2];
  }

  const content = contents.find(content => content.user.id == userId);
  const user = content?.user;

  return (
    <>
      <div style={{ height: '100vh' }}>
        <PageView
          scrollable={props.scrollable}
        >
          {contents.map((content: any,) => {
            return (
              <PageViewItem key={content.id}>
                <Card.FeedItem key={content.id} data={content} />
              </PageViewItem>
            );
          })}
        </PageView>
      </div>

      <AnimatePresence exitBeforeEnter>
        {
          user ?
            <ChildView goback={() => { navigate(-1); }}>
              <User user={user} />
            </ChildView> : null
        }
      </AnimatePresence>
    </>
  )
}