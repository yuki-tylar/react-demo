import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import { CanActivateIfLoggedIn } from "../guards/can-activate-if-logged-in";
import { logout } from "../redux/slice-auth";
import { rSettingAction } from "../redux/slice-settings";
import { PropsWithReduxSetting, settingConnector } from "../redux/store";
import { Switch } from "../widgets/switch";

export function MyProfile() {
  return createElement(settingConnector(_MyProfile));
}

export function _MyProfile(props: PropsWithReduxSetting) {
  const navigate = useNavigate();

  const changeAppearance = (isDark: boolean) => {
    props.dispatch(rSettingAction.changeAppearance(isDark ? 'dark' : 'light'))
  }

  return (
    <CanActivateIfLoggedIn onGuard={() => { navigate('/login', {replace: true})}}>
      <div className="p-15p">
        <div className="mb-50p d-flex main-axis-between">
          <span className="subtitle1">Darkmode</span>
          <Switch 
          isOn={props.setting.appearance === 'dark'} 
          onToggle={(isOn: boolean) => { changeAppearance(isOn); }}
          />
        </div>
        <div>
          <button 
          className="btn btn-error w-100pc"
          onClick={() => { logout(props.dispatch); }}
          >Logout</button>
        </div>
      </div>
    </CanActivateIfLoggedIn>
  )
}