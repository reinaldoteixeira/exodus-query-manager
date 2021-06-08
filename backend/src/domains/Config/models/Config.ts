import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity('configs')
class Config {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export { Config };
