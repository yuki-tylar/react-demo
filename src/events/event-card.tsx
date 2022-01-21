import { format } from "date-fns/esm";
import { Component } from "react";
import { AspectRatio, FittedBox } from "../widgets/box";

export class EventCard extends Component<{ event: any }> {
  render() {
    return (
      <div
        style={{ touchAction: 'pan-y' }}
        className="card rounded-8p overflow-hidden mx-15p"
      >
        <AspectRatio ratio={4 / 9}>
          <FittedBox.Img
            image={this.props.event.image}
            style={{
              position: 'absolute',
              objectFit: 'cover',
            }}
          />
          <div className="pos-absolute w-100pc top-0p px-15p pt-15p" style={{ boxSizing: 'border-box' }}>
            <ul className="list-unstyled clamp-1line">
              {
                this.props.event.tags.map((tag: { id: string, name: string }) => {
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
              {format(this.props.event.date, 'MMM dd yyyy, hh:mm a')}
            </div>
            <h6 className="clamp-2line text-white">
              {this.props.event.name}
            </h6>
          </div>
        </AspectRatio>
        <div className="p-15p">
          <p className="body2 clamp-3line">
            {this.props.event.description}
          </p>
          <div className="mt-10p">
            <div className="d-flex">
              <div className='d-flex'>
                {
                  this.props.event.attendees.map((attendee: { id: string, name: string, profileImage: string }, i: number) => {
                    if (i < 4) {
                      return (
                        <div key={this.props.event.id + '-' + attendee.id} className="w-15p">
                          <div className="pos-absolute circle w-30p border-label" style={{ marginTop: '-15px' }}>
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
              <div className="d-inline-block ml-25p body2">{this.props.event.attendees.length} people are attending</div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}