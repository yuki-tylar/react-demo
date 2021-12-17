import { commonService } from "../service/common-service";
import { loremIpsum } from 'lorem-ipsum';
export const contents = [
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample.png',
    user: {
      id: commonService.getRandomString(8),
      name: 'Takayuki',
      profileImage: '/assets/sample-human.jpeg',
      description: loremIpsum({count: 300})
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample2.webp',
    user: {
      id: commonService.getRandomString(8),
      name: 'Takayuki',
      profileImage: '/assets/sample-human.jpeg'
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample3.webp',
    user: {
      id: commonService.getRandomString(8),
      name: 'Takayuki',
      profileImage: '/assets/sample-human.jpeg'
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  }
];