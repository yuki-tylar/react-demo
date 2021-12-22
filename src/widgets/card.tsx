import moment from 'moment';
import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio, FittedBox } from './box';

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
      <div className="pos-relative bg-black" style={{width: '100%', height: window.innerHeight + 'px'}}>
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
          <Link
            to='user'
            onClick={this.props.selectUser}
          >
            <div className="circle w-45p w-md-60p">
              <FittedBox.Img
                style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                image={this.props.data.user.profileImage}
              />
            </div>
          </Link>
        </div>

      </div>
    );
  }
}

export class UserItem extends Component<{ data: any }> {
  render() {
    return (
      <div
        style={{ touchAction: 'pan-y' }}
        className="rounded-8p overflow-hidden card"
      >
        <AspectRatio ratio={6 / 4}>
          <FittedBox.Img
            image={this.props.data.profileImage}
            style={{
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        </AspectRatio>
      </div>
    );
  }
}

export class EventItem extends Component<{ data: any }> {
  render() {
    return (
      <div
        style={{ touchAction: 'pan-y' }}
        className="card rounded-8p overflow-hidden mx-15p"
      >
        <AspectRatio ratio={4 / 9}>
          <FittedBox.Img
            image={this.props.data.image}
            style={{
              position: 'absolute',
              objectFit: 'cover',
            }}
          />
          <div className="pos-absolute w-100pc top-0p px-15p pt-15p" style={{ boxSizing: 'border-box' }}>
            <ul className="list-unstyled clamp-1line">
              {
                this.props.data.tags.map((tag: { id: string, name: string }) => {
                  return (
                    <li
                      key={tag.id}
                      className="d-inline-block mr-10p mb-5p py-5p px-10p rounded-4p space-nowrap bg-primary text-white subtitle2"
                    >
                      {tag.name}
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div className="pos-absolute w-100pc bottom-0p px-15p pb-15p" style={{ boxSizing: 'border-box' }}>
            <div className="subtitle2 mb-10p text-white">
              {moment(this.props.data.date).format('MMM DD YYYY hh:mm')}
            </div>
            <h6 className="clamp-2line text-white">
              {this.props.data.name}
            </h6>
          </div>
        </AspectRatio>
        <div className="p-15p">
          <p className="body2 clamp-3line">
            {this.props.data.description}
          </p>
          <div className="mt-10p">
            <div className="d-flex">
              <div>
                {
                  this.props.data.attendees.map((attendee: { id: string, name: string, profileImage: string }, i: number) => {
                    if (i < 4) {
                      return (
                        <div key={attendee.id} className="w-15p d-inline-block">
                          <div className="pos-absolute circle w-30p border-label">
                            <FittedBox.Img image={attendee.profileImage} style={{ position: 'absolute', objectFit: 'cover' }} />
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                }
              </div>
              <div className="d-inline-block ml-25p body2">{this.props.data.attendees.length} people are attending</div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export * as Card from './card';