import { Component } from "react";
import { FittedBox } from "../widgets/fitted-box";

export class FeedEvent extends Component<{}> {
  render() {
    return (
      <FittedBox.div style={{background: 'grey'}}>
        <div className="w-100p square" style={{ background: 'white' }}></div>
      </FittedBox.div>
    );
  }
}