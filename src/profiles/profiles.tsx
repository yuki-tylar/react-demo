import { useEffect, useState } from "react";
import { GetQuery } from "../redux/slice-profiles";
import { MyLoader } from "../widgets/loader";
import { _getProfiles } from "../_temp/users";
import { SnackbarStyle } from "../redux/slice-snackbar";
import { useProfilesDispatchAction, useSelectorProfileFilter, useSelectorProfileIsInitialized, useSelectorProfiles } from "../selectors/profiles";
import { useSnackbarDispatchAction } from "../selectors/snackbar";
import { ProfilesUI } from "./profiles-ui";
import { NoContent } from "../widgets/no-content";

const defaultLimit = 4;
const defaultSort = 'name';
const defaultOrder = -1;

export function Profiles() {

  const dispatcher = useProfilesDispatchAction();
  const dispatcherSnackbar = useSnackbarDispatchAction();
  const isInitialized = useSelectorProfileIsInitialized();
  const profilesAll = useSelectorProfiles();
  const filter = useSelectorProfileFilter();

  const filterProfiles = () => {
    if (profilesAll?.length > 1) {
      let result: any[] = Array.from(profilesAll);

      if(filter) {
        const sort = filter.sort;
        const order = filter.order;  

        result = result.sort((a: any, b: any) => {
          if (a[sort] instanceof Date) {
            return (a[sort].getTime() - b[sort].getTime()) * order;
          } else if (typeof a[sort] === 'number') {
            return (a[sort] - b[sort]) * order;
          } else if (typeof a[sort] === 'string') {
            return a[sort].toUpperCase().localeCompare(b[sort].toUpperCase()) * order;
          } else {
            return 1;
          }
        });  
        result = result.slice(0, filter.count || 10000);
      }
      return result;
    } else {
      return profilesAll;
    }
  }

  let profiles = filterProfiles();
  let [fetching, setFetching] = useState<boolean>(false);

  const fetchHandler = async (query: GetQuery = {}) => {
    query = {
      ...query,
      ...!query.limit && { limit: defaultLimit },
      ...!query.skip && { skip: profiles.length },
      ...!query.sort && { sort: defaultSort },
      ...(query.order !== -1 && query.order !== 1) && { order: defaultOrder },
    }

    try {
      dispatcher.updateFilter({
        count: query.limit! + (query.skip || 0),
        sort: query.sort!,
        order: query.order!,
      });

      setFetching(true);
      const data = await _getProfiles(query);
      dispatcher.add(data, true);
      setFetching(false);
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
          isInitialized && profiles?.length === 0 ?
            <div
              className="pt-25p"
              style={{ margin: 'auto', width: 'calc(100% - 30px)', maxWidth: '400px' }}
            >
              <NoContent message='No contents!' />
            </div> : null
        }
        {
          profiles.length > 0 ?
            <>
              <ProfilesUI profiles={profiles} />
              <div className="text-center">
                <button
                  className="btn-primary"
                  onClick={() => { fetchHandler() }}
                >More</button>
              </div>
            </>
            : null
        }
        {
          fetching ? <MyLoader></MyLoader> : null
        }
      </div>
    </div>
  );
}