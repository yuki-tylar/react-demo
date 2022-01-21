import { useLocation, useNavigate } from "react-router-dom";
import { AspectRatio, FittedBox } from "../widgets/box";
import { ProfileCard } from "./profile-card";

export function ProfilesUI(props: { profiles: any[] }) {
  console.log('profileUI');
  const location = useLocation();
  const navigate = useNavigate();

  return (
    props.profiles.length === 0 ?
      <div
        className="pt-25p"
        style={{ margin: 'auto', width: 'calc(100% - 30px)', maxWidth: '400px' }}
      >
        <div className="rounded-12p overflow-hidden">
          <AspectRatio ratio={3 / 2}>
            <FittedBox.Img
              image={"/assets/no-content.png"}
              style={{ objectFit: 'cover', position: 'absolute' }}
            />
          </AspectRatio>

        </div>
        <h6 className="text-center mt-15p">No content!</h6>
      </div>
      :

      <div className="d-flex main-axis-between mx-10p" style={{ flexWrap: 'wrap' }}>
        {
          props.profiles.map((profile: any) => {
            return (
              <div
                key={profile.id}
                className="main-axis-item-2 main-axis-item-md-3 mb-15p mb-md-20p"
                onClick={() => {
                  navigate(`/user/${profile.id}`, { state: { background: location } })
                }}
              >
                <ProfileCard profile={profile}></ProfileCard>
              </div>
            );
          })
        }
      </div>
  );
}