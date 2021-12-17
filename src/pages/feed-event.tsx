import { Card } from "../widgets/card";
import { events } from "../_temp/events";

export function FeedEvent(props: { scrollable: boolean }) {
  return (
    <div
      className="bg-background"
      style={{ touchAction: 'pan-y'}}
    >
      <div className="mt-45p mt-md-60p mb-80p mb-md-100p">
        {
          events.map((event: any) => {
            return (
              <div key={event.id} className="mb-15p mb-md-25p">
                <Card.EventItem data={event}></Card.EventItem>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
