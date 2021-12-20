import { commonService } from "../service/common-service";

export function _getContents (query: {sort?: string, order?: -1|1, limit?: number, skip?: number }): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let results: any[] = contents;
      const sort = query.sort;
      if(sort) {
        const order = query.order === -1 ? -1 : 1
        results = results.sort((a: any, b: any) => {
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
      }
      
      results = results.slice(query.skip || 0, query.limit || 10000);
      resolve(results);
    }, 1000);
  });
}
export const contents = [
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample.png',
    user: 'u15',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample2.webp',
    user: 'u2',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: commonService.getRandomString(8),
    image: '/assets/sample3.webp',
    user: 'u4',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  }
];