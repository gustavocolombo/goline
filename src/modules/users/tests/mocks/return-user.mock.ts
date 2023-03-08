import { RolesUser, StatusUser } from '@prisma/client';

export const returnUser = {
  id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: 'pass123',
  height: 60.21,
  weight: 1.7,
  cellphone: '55942240797',
  status: StatusUser.ACTIVE,
  roles: RolesUser.USER,
  created_at: new Date(),
  updated_at: new Date(),
  address: [
    {
      id: '08269894-889a-4a37-bfa9-513bbde09c31',
      users_id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
      dressmaker_id: null,
      lat: -3.7782299,
      lng: -38.5920675,
      city: 'Quixadá',
      street: 'Clarindo Queiroz',
      neighborhoud: 'Centro',
      number: 703,
      zip_code: '82911060',
    },
  ],
};

export const returnUseSoftDeleted = {
  id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: 'pass123',
  height: 60.21,
  weight: 1.7,
  cellphone: '55942240797',
  status: StatusUser.INACTIVE,
  roles: RolesUser.USER,
  created_at: new Date(),
  updated_at: new Date(),
  address: [
    {
      id: '08269894-889a-4a37-bfa9-513bbde09c31',
      users_id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
      dressmaker_id: null,
      lat: -3.7782299,
      lng: -38.5920675,
      city: 'Quixadá',
      street: 'Clarindo Queiroz',
      neighborhoud: 'Centro',
      number: 703,
      zip_code: '82911060',
    },
  ],
};

export const returnUserWithPassReseted = {
  id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: 'newPass123',
  height: 60.21,
  weight: 1.7,
  cellphone: '55942240797',
  status: StatusUser.ACTIVE,
  roles: RolesUser.USER,
  created_at: new Date(),
  updated_at: new Date(),
  address: [
    {
      id: '08269894-889a-4a37-bfa9-513bbde09c31',
      users_id: 'f5bfff7a-d7d8-4500-91fd-277f072e9131',
      dressmaker_id: null,
      lat: -3.7782299,
      lng: -38.5920675,
      city: 'Quixadá',
      street: 'Clarindo Queiroz',
      neighborhoud: 'Centro',
      number: 703,
      zip_code: '82911060',
    },
  ],
};
