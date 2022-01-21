import { AspectRatio, FittedBox } from "../widgets/box";

type Props = {
  profile: any;
}

export function ProfileCard({ profile }: Props) {
  return (
    <div
      style={{ touchAction: 'pan-y' }}
      className="rounded-8p overflow-hidden card"
    >
      <AspectRatio ratio={6 / 4}>
        <FittedBox.Img
          image={profile.profileImage}
          style={{
            objectFit: 'cover',
            position: 'absolute'
          }}
        />
      </AspectRatio>
    </div>
  );
}