import { isAfter } from "date-fns";
import { GetQuery } from "../redux/slice-profiles";
import { _getProfilesById } from "./users";

export function _getEvents(query: GetQuery): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let results = Array.from(events);
      const sort = query.sort;
      if (sort) {
        const order = query.order === -1 ? -1 : 1;
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

      results = results.filter(item => {
        return query.laterThan ? isAfter(item.date, query.laterThan) : true;
      });

      const start = query.skip || 0;
      const end = start + (query.limit || 10000);
      results = results.slice(start, end);

      let idAttendees: any[] = [];
      results.forEach(item => {
        idAttendees = idAttendees.concat(item.attendees);
      });
      idAttendees = Array.from(new Set(idAttendees));
      const users = await _getProfilesById(idAttendees);

      results = results.map(item => {
        item.attendees = users.filter(user => item.attendees.find((attendee: string) => attendee === user.id));
        return item;
      });

      resolve(results);
    }, 1000);
  });
}

const events = [
  {
    id: 'e1',
    name: 'A EVENT',
    image: '/assets/sample.png',
    date: new Date(2021, 11, 30, 12),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u1', 'u2', 'u4']
  },
  {
    id: 'e2',
    name: 'B EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 5, 12, 15),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u2', 'u7', 'u1', 'u10', 'u14'],
  },
  {
    id: 'e3',
    name: 'C EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 2, 15, 16),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u12', 'u9', 'u15', 'u2', 'u10', 'u1'],
  },
  {
    id: 'e4',
    name: 'D EVENT',
    image: '/assets/sample.png',
    date: new Date(2021, 1, 1, 12),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u12', 'u9', 'u15', 'u2'],

  },
  {
    id: 'e5',
    name: 'E EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 1, 18, 5),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u1', 'u14', 'u12', 'u7', 'u9', 'u4', 'u2', 'u5', 'u6', 'u11', 'u13', 'u10', 'u3', 'u8'],

  },
  {
    id: 'e6',
    name: 'F EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 9, 12, 10),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: [],
  },
  {
    id: 'e7',
    name: 'G EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 8, 11, 5),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u8'],
  },
  {
    id: 'e8',
    name: 'H EVENT',
    image: '/assets/sample.png',
    date: new Date(2022, 8, 9, 2),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    tags: [
      { id: '79kudifer', name: 'test tag 1' },
      { id: '784k876Cr', name: 'test tag 2' },
      { id: '0okDeifer', name: 'test tag 3' },
      { id: '78iklifer', name: 'test tag 4' },
    ],
    attendees: ['u2', 'u1', 'u8', 'u12', 'u4', 'u5', 'u6'],

  },
]