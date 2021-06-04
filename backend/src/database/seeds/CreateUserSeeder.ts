import bcrypt from 'bcryptjs';
import { ulid } from 'ulid';

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../domains/User/models/User';

export default class CreateUserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: ulid(),
        name: 'Admin',
        email: 'admin@exodus.com',
        role: 1,
        password: bcrypt.hashSync('123456'),
      })
      .execute();
  }
}
