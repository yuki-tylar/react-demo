import { EventCard } from "./event-card";

type Props = {
  events: any[];
}

export function EventsUI({ events }: Props) {
  return (
    <>
      {
        events.map((event) => {
          return (
            <div key={event.id} className="mb-15p mb-md-25p">
              <EventCard event={event} />
            </div>
          );
        })
      }
    </>
  );
}