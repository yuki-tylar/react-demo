import { Component, createElement } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { snackbarMessage } from "../definition/message";
import { fetchProfileById } from "../redux/slice-profiles";
import { profileConnector, PropsWithReduxProfile } from "../redux/store";
import { MyLoader } from "../widgets/loader";
import { UserDetailUI } from "./user-detail-ui";

interface Props extends PropsWithReduxProfile {
  userId: string | undefined;
  navigate: NavigateFunction
}

export function UserDetail() {
  const params = useParams();
  const navigate = useNavigate();

  return createElement(profileConnector(_UserDetailController), { userId: params.id, navigate: navigate });
}


class _UserDetailController extends Component<Props, { loading: boolean, data: any, error: string | null }> {

  constructor(props: Props) {
    super(props);

    let data: any = null;
    let error: string | null = null;
    if (props.userId) {
      data = props.profile.data.find(profile => props.userId === profile.id) || null;
    } else {
      error = snackbarMessage.ERROR;
    }

    this.state = { loading: false, data: data, error: error };
  }

  async componentDidMount() {

    if (!this.state.data && !this.state.loading && !this.state.error && this.props.userId) {
      this.setState({ ...this.state, loading: true });

      try {
        const data = await fetchProfileById(this.props.dispatch, this.props.userId);
        this.setState({ data: data, loading: false, error: null});
      } catch (error) {
        this.setState({ data: null, loading: false, error: error as string });
      }
    }
  }

  render() {
    return (
      this.state.loading ?
        <MyLoader /> :
        this.state.data ? <UserDetailUI profile={this.state.data} /> : <></>
    );
  }
}

