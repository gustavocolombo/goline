import { Dressmaker } from '@prisma/client';

export const mockReturnDressmaker: Dressmaker = {
  id: 'e0da64eb-cb53-4831-8054-9c8335d654e2',
  name: 'John Doe',
  email: 'johndoedressmaker@gmail.com',
  cellphone: '55971190696',
  password: 'pass1234',
  image_profile: null,
  expertise: ['dressmaking', 'needlework'],
  status: 'ACTIVE',
  created_at: new Date(),
  updated_at: new Date(),
  roles: 'DRESSMAKER',
};
