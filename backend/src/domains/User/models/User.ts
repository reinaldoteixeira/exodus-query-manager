import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: number;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export { User };
