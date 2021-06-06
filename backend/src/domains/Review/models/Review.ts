import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { Request } from '../../Request/models/Request';
import { User } from '../../User/models/User';

@Entity('reviews')
class Review {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => Request)
  @JoinColumn({ name: 'request' })
  request: Request;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  observation: string | null;

  @Column()
  action: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export { Review };
