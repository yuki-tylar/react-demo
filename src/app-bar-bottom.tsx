import { Component } from "react";
import { Link } from "react-router-dom";

export class AppBarBottom extends Component {
  render() {
    return (
      <ul className="bottom-bar-inner d-flex main-axis-between list-unstyled px-30p">
        <li className="text-center">
          <AppBarBottomIcon linkTo="/" icon="/assets/icons/stack.svg" label="Explore" />
        </li>
        <li className="text-center">
          <AppBarBottomIcon linkTo="/explore" icon="/assets/icons/search.svg" label="Search" />
        </li>
        <li className="text-center">
          <AppBarBottomIcon linkTo="/explore" icon="/assets/icons/plus.svg" label="Post" />
        </li>
        <li className="text-center">
          <AppBarBottomIcon linkTo="/explore" icon="/assets/icons/message.svg" label="Message" />
        </li>
        <li className="text-center">
          <AppBarBottomIcon linkTo="/explore" icon="/assets/icons/profile.svg" label="Profile" />
        </li>
      </ul>
    );
  }
}

class AppBarBottomIcon extends Component<{ linkTo: string; icon: string; label: string; }> {
  render() {
    return (
      <Link to={this.props.linkTo}>
        <img src={this.props.icon} width='20' height='20' />
        <div className="text-white caption body-small-md">{this.props.label}</div>
      </Link>
    );
  }
}