import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity('requests')
class Request {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

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
  status: Number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export { Request };
