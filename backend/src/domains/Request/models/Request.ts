import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { User } from '../../User/models/User';

@Entity('requests')
class Request {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  host: string;

  @Column()
  databases: string;

  @Column()
  description: string;

  @Column()
  time_to_run: string;

  @Column()
  schedule: string;

  @Column()
  ddl_command: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export { Request };
