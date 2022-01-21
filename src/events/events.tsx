import { formatISO, isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { fetchEvents } from "../redux/slice-events";
import { GetQuery } from "../redux/slice-profiles";
import { SnackbarStyle } from "../redux/slice-snackbar";
import { useEventsDispatchAction, useSelectorEventFilter, useSelectorEventIsInitialized, useSelectorEvents } from "../selectors/events";
import { useSnackbarDispatchAction } from "../selectors/snackbar";
import { MyLoader } from "../widgets/loader";
import { NoContent } from "../widgets/no-content";
import { EventsUI } from "./events-ui";

const defaultLimit = 3;
const defaultSort = 'date';
const defaultOrder = 1;
const defaultLaterThan = new Date();

export function Events() {

  const dispatcher = useEventsDispatchAction();
  const dispatcherSnackbar = useSnackbarDispatchAction();
  const isInitialized = useSelectorEventIsInitialized();
  const eventsAll = useSelectorEvents();
  const filter = useSelectorEventFilter();

  const filterEvents = () => {
    if (eventsAll?.length > 1) {
      let results = Array.from(eventsAll);
      if (filter) {
        const sort = filter.sort!;
        const order = filter.order!;

        if (filter?.laterThan) {
          results = results.filter(item => isAfter(item.date, filter.laterThan!));
        }

        results = results.sort((a, b) => {
          if (a[sort] instanceof Date) {
            return (a[sort].getTime() - b[sort].getTime) * order;
          } else if (typeof a[sort] === 'number') {
            return (a[sort] - b[sort]) * order;
          } else if (typeof a[sort] === 'string') {
            return (a[sort].toUpperCase() - b[sort].toUpperCase()) * order;
          } else {
            return 1;
          }
        });
      }

      results = results.slice(0, filter.count);
      return results;
    } else {
      return eventsAll;
    }
  }

  let events = filterEvents();
  let [fetching, setFetching] = useState<boolean>(false);
  let [existMore, setExistMore] = useState<boolean>(true);

  const fetchHandler = async (query: GetQuery = {}) => {
    query = {
      ...query,
      ...!query.limit && { limit: defaultLimit },
      ...!query.skip && { skip: events.length },
      ...!query.sort && { sort: defaultSort },
      ...(query.order !== -1 && query.order !== 1) && { order: defaultOrder },
      ...!query.laterThan && { laterThan: defaultLaterThan },
    }

    dispatcher.updateFilter({
      count: query.limit! + (query.skip || 0),
      sort: query.sort!,
      order: query.order!,
      laterThan: (query.laterThan ? formatISO(query.laterThan) : null),
    });

    try {
      setFetching(true);
      const data = await fetchEvents(query);
      dispatcher.add(data, true);
      setFetching(false);
      if (existMore && data.length < query.limit!) {
        setExistMore(false);
      }

    } catch (error) {
      setFetching(false);
      dispatcherSnackbar.show({
        message: error as string,
        style: SnackbarStyle.error
      });
    }
  }

  useEffect(() => {
    if (!isInitialized) {
      fetchHandler({ sort: defaultSort, order: defaultOrder, limit: defaultLimit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100%', touchAction: 'pan-y' }} >
      <div className="mt-45p mt-md-60p mb-80p mb-md-100p">
        {
          isInitialized && events?.length === 0 ?
            <div
              className="pt-25p"
              style={{ margin: 'auto', width: 'calc(100% - 30px)', maxWidth: '400px' }}
            >
              <NoContent message='No contents!' />
            </div> : null
        }
        {
          events.length > 0 ?
            <EventsUI events={events} />
            : null
        }
        {
          fetching ? <MyLoader></MyLoader> : null
        }
        {
          !fetching && existMore ?
            <div className="text-center">
              <button
                className="btn-primary"
                onClick={() => { fetchHandler() }}
                disabled={fetching}
              >
                More
              </button>
            </div>
            : null
        }
      </div>
    </div>
  );
}