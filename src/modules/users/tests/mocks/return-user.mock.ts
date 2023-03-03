import { RolesUser, StatusUser } from '@prisma/client';

export const returnUser = {
  id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
  name: 'Gustavo Rocha',
  email: 'gustavorocha6@gmail.com',
  height: 60.21,
  weight: 1.7,
  cellphone: '85981180797',
  password: '123',
  status: StatusUser.ACTIVE,
  roles: RolesUser.USER,
  created_at: new Date(),
  updated_at: new Date(),
  address: [
    {
      id: '08269894-889a-4a37-bfa9-513bbde09c31',
      city: 'horizonte',
      neighborhoud: 'centro',
      number: 703,
      street: 'centro rua',
      lat: -3.7782299,
      lng: -38.5920675,
      users_id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
      dressmaker_id: null,
    },
  ],
};
