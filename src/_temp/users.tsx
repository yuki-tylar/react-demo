export function _getProfiles (query: {sort?: string, order?: -1|1, limit?: number, skip?: number }): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let results: any[] = users;
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
      
      results = results.slice(query.skip || 0, query.limit! + query.skip! || 10000);
      results = results.map(u => _removeCredential(u) );
      resolve(results);
    }, 1000);
  });
}

export function _getProfileById (id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user: any = users.find(item => item.id === id);
      if(user) {
        resolve( _removeCredential(user) );
      } else {
        reject();
      }
    }, 400);
  });
}

export function _getProfilesById (ids: string[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result: any[] = users.filter(item => ids.find(id => id === item.id));
      result = result.map(u => _removeCredential(u) );
      resolve(result);
    }, 800);
  })
}

export function _getProfile(data: {[k: string]: any}): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user: any = users.find((item: {[k: string]: any}) => {
        let matched = false;
        for (let key in data) {
          matched = item[key] === data[key];
          if(!matched) {
            break;
          }
        }
        return matched ? item : null;
      });

      if(user) {
        resolve (user);
      } else {
        reject();
      }  
    }, 400)
  })
}

function _removeCredential(user: any) {
  const u = {...user};
  delete u.password;
  delete u.email;
  return u;
} 

export const users = [
  {
    id: 'u1',
    name: 'USERNAME1',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human1.jpeg',
    email: 'demo1@gmail.com',
    password:'demo',
    token:'token1' 
  },
  {
    id: 'u2',
    name: 'USERNAME2',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human2.jpeg',
    email: 'demo2@gmail.com',
    password:'demo',  
    token:'token2',
  },
  {
    id: 'u3',
    name: 'USERNAME3',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human3.jpeg',
    email: 'demo3@gmail.com',
    password:'demo',  
    token:'token3',
  },
  {
    id: 'u4',
    name: 'USERNAME4',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human4.jpeg',
    email: 'demo4@gmail.com',
    password:'demo',  
    token:'token4',
  },
  {
    id: 'u5',
    name: 'USERNAME5',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human5.jpeg',
    email: 'demo5@gmail.com',
    password:'demo',  
    token:'token5',
  },
  {
    id: 'u6',
    name: 'USERNAME6',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human6.jpeg',
    email: 'demo6@gmail.com',
    password:'demo',  
    token:'token6',
  },
  {
    id: 'u7',
    name: 'USERNAME7',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human7.jpeg',
    email: 'demo7@gmail.com',
    password:'demo',  
    token:'token7',
  },
  {
    id: 'u8',
    name: 'USERNAME8',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human8.jpeg',
    email: 'demo8@gmail.com',
    password:'demo',  
    token:'token8',
  },
  {
    id: 'u9',
    name: 'USERNAME9',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human9.jpeg',
    email: 'demo9@gmail.com',
    password:'demo',  
    token:'token9',
  },
  {
    id: 'u10',
    name: 'USERNAME10',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human10.jpeg',
    email: 'demo10@gmail.com',
    password:'demo',  
    token:'token10',
  },
  {
    id: 'u11',
    name: 'USERNAME11',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human11.jpeg',
    email: 'demo11@gmail.com',
    password:'demo',  
    token:'token11',
  },
  {
    id: 'u12',
    name: 'USERNAME12',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human12.jpeg',
    email: 'demo12@gmail.com',
    password:'demo',  
    token:'token12',
  },
  {
    id: 'u13',
    name: 'USERNAME13',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human13.jpeg',
    email: 'demo13@gmail.com',
    password:'demo',  
    token:'token13',
  },
  {
    id: 'u14',
    name: 'USERNAME14',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human14.jpeg',
    email: 'demo14@gmail.com',
    password:'demo',  
    token:'token14',
  },
  {
    id: 'u15',
    name: 'USERNAME15',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profileImage: '/assets/sample-human15.jpeg',
    email: 'demo15@gmail.com',
    password:'demo',  
    token:'token15',
  },

];