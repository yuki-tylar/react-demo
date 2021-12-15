import { motion } from "framer-motion";
import { Component, useRef } from "react";
import { Card } from "../widgets/card";
import { FittedBox } from "../widgets/fitted-box";
import { PageView, PageViewItem } from "../widgets/page-view";

const contents = [
  {
    id: '1Dig8Edg',
    image: 'assets/sample.png',
    user: {
      name: 'Takayuki',
      profileImage: 'assets/sample-human.jpeg'
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 'ki8#0dferd',
    image: 'assets/sample2.webp',
    user: {
      name: 'Takayuki',
      profileImage: 'assets/sample-human.jpeg'
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: '9Ekid74#d',
    image: 'assets/sample3.webp',
    user: {
      name: 'Takayuki',
      profileImage: 'assets/sample-human.jpeg'
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  }
];

export function FeedRecommend(props: any) {

  const refContent = useRef<HTMLDivElement>(null);
  const panThreshold = 0.4;

  let initialY = 0;
  return (
    <PageView  >
      {contents.map((content: any,) => {
        return (
          <PageViewItem key={content.id}>
            <Card.FeedItem key={content.id} data={content} />
          </PageViewItem>
        );
      })}
    </PageView>
  )

}