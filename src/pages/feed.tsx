import { Component, CSSProperties, ReactElement } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import PageView, { PageViewDirection, PageViewItem } from "../widgets/page-view";
import { FittedImage } from '../widgets/fitted-image';
import { Card } from "../widgets/card";

export default function FeedBase (props: {}) {
    const location = useLocation();
    let appbarTitle: string | null;
    switch(true) {
      case /recommend/.test(location.pathname): appbarTitle = 'Recommend'; break;
      case /event/.test(location.pathname): appbarTitle = 'Events'; break;
    }

    return (
      <div>
        <div className="app-body">
          <div className="app-bar d-flex main-axis-center">
            <h2 className="headline4 headline3-md">
              {appbarTitle!}
            </h2>
          </div>
          <div>
            <Routes>
              <Route path='recommend' element={<FeedRecommend />} />
              <Route path='event' element={<FeedRecommend />}/>
            </Routes>
          </div>
        </div>


        <div className="bottom-bar">
          <div className="bottom-bar-inner">

          </div>
        </div>
        

      </div>
    );

}

class FeedRecommend extends Component {
  private contents: any[] = [
    {
      image: 'assets/sample.png', 
      user: {
        name: 'Takayuki', 
        profileImage: ''
      }, 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    },
    {
      image: 'assets/sample2.webp', 
      user: {
        name: 'Takayuki', 
        profileImage: ''
      }, 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    },
    {
      image: 'assets/sample3.webp', 
      user: {
        name: 'Takayuki', 
        profileImage: ''
      }, 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    }
  ];

  constructor(props: any){
    super(props);
  }

  getCardFeedItemList() {
    return this.contents.map((data, i) => {
      return <PageViewItem key={i} child={<Card.FeedItem data={data} />}></PageViewItem>
    })
  }

  render() {
    return (
      <PageView 
      children={this.getCardFeedItemList()}
      direction={PageViewDirection.vertical}
      threshold={0.3}
      ></PageView>
    );
  }
}