import { LoremIpsum, loremIpsum } from "lorem-ipsum";
import { commonService } from "../service/common-service";

export const users = [
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 2, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 2, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 2, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 2, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 2, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },
  {
    id: commonService.getRandomString(8),
    name: loremIpsum({count: 1, units: 'sentences', sentenceUpperBound: 1, sentenceLowerBound: 1}),
    description: loremIpsum({count: 50}),
    profileImage: '/assets/sample-human.jpeg'
  },

];