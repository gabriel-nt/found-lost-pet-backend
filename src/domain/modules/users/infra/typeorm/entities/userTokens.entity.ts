import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('users_tokens')
export class UserTokens {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  refresh_token: string;

  @ApiProperty()
  @Column()
  user_id: string;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ApiProperty()
  @Column()
  expires_date: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
