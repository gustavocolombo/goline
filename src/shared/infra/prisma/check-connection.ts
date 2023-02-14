import { PrismaClient } from '@prisma/client';

let database;

//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient();
} else {
  //check if there is already a connection to the database
  if (!global.db) {
    global.db = new PrismaClient();
  }
  database = global.db;
}

export { database };
