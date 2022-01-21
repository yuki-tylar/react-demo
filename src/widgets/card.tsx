import { Component, createRef } from 'react';
import { FittedBox } from './box';

interface IFeedItemProps {
  data: {
    image: string;
    user: {
      id: string;
      name: string;
      profileImage: string;
    },
    description: string;
  }
  selectUser: () => void;

}
export class FeedItem extends Component<IFeedItemProps, { isDescriptionOpened: boolean; }> {

  get elDesc() { return this._descRef.current }
  private _descRef = createRef<HTMLParagraphElement>();

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
      <div className="pos-relative bg-black" style={{ width: '100%', height: window.innerHeight + 'px' }}>
        <FittedBox.Img
          style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0, filter: 'blur(18px) brightness(0.7)' }}
          image={this.props.data.image}
          filter="brightness(0.6) blur(10px)"
          draggable={false}
        />

        <FittedBox.Img
          style={{ objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
          image={this.props.data.image}
          draggable={false}
        />
        <div
          className='pos-absolute left-15p top-72pc mr-20pc text-white'
        >
          <h6>{this.props.data.user.name}</h6>
          <p
            ref={this._descRef}
            onClick={this.toggleDescExpand}
            className={'body2 overflow-hidden' + (this.state.isDescriptionOpened ? '' : ' clamp-2line')}
          >{this.props.data.description}</p>
        </div>
        <div className="pos-absolute right-15p top-36pc">
          <div
            className="circle w-45p w-md-60p"
            onClick={this.props.selectUser}
          >
            <FittedBox.Img
              style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              image={this.props.data.user.profileImage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export * as Card from './card';