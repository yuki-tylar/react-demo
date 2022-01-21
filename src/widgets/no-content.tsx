import { AspectRatio, FittedBox } from "./box";

type Props = {
  message: string;
}
export function NoContent ({message}: Props) {
  return (
    <>
      <div className="rounded-12p overflow-hidden">
        <AspectRatio ratio={3 / 2}>
          <FittedBox.Img
            image={"/assets/no-content.png"}
            style={{ objectFit: 'cover', position: 'absolute' }}
          />
        </AspectRatio>

      </div>
      <h6 className="text-center mt-15p">{message}</h6>
    </>
  );
}