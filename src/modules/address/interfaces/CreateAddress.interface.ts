import { Users } from '@prisma/client';

export class CreateAddressInterface {
  lat: number;

  lng: number;

  street: string;

  city: string;

  neighborhoud: string;

  number: number;

  zip_code: string;

  user: Users;
}
