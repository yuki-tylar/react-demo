import { Component, createRef, CSSProperties, RefObject } from 'react';
import {FittedImage} from '../widgets/fitted-image';

interface IFeedItemProps {
  data: {
    image: string;
    user: {
      name: string;
      profileImage: string;
    },
    description: string;  
  }

}
export class FeedItem extends Component<IFeedItemProps, {isDescriptionOpened: boolean;}> {

  get elDesc() { return this._descRef.current}
  private _descRef: RefObject<HTMLParagraphElement> = createRef();

  constructor(props: IFeedItemProps) {
    super(props);
    this.state = {
      isDescriptionOpened: false,
    }
  }

  toggleDescExpand = () => {
    this.setState({
      isDescriptionOpened: !this.state.isDescriptionOpened,
    });
  }

  render() {
    return (
      <div>
        <FittedImage.Cover 
        image={this.props.data.image} 
        filter="brightness(0.6) blur(10px)"
        draggable={false}
        />
        
        <FittedImage.Contain 
        image={this.props.data.image}
        draggable={false}
        />
        <div className='pos-absolute left-15p top-72pc mr-20pc'>
          <h6>{this.props.data.user.name}</h6>
          <p 
          ref={this._descRef} 
          onClick={this.toggleDescExpand}
          className={'body2' + (this.state.isDescriptionOpened ? '' : ' clamp-2line')}
          >{this.props.data.description}</p>
        </div>
        <div className="pos-absolute right-15p top-36pc">
          <div className="circle w-45p w-md-60p">
            <FittedImage.Cover image={this.props.data.user.profileImage} />
          </div>
        </div>

      </div>
    );
  }
}

export * as Card from './card';