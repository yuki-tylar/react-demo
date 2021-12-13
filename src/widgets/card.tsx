import {FittedImage} from '../widgets/fitted-image';

export const FeedItem = (props: {
  data: {
    image: string;
    user: {
      name: string;
      profileImage: string;
    },
    description: string;  
  }
}) => {
  return (
    <div>
      <FittedImage.Cover 
      image={props.data.image} 
      filter="brightness(0.6) blur(10px)"
      draggable={false}
      />
      
      <FittedImage.Contain 
      image={props.data.image}
      draggable={false}
      />
    </div>
  );
}

export * as Card from './card';