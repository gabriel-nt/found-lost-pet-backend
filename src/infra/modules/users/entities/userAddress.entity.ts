import { randomUUID } from 'crypto';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('users_address')
export class UserAddress {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @Exclude()
  @ApiProperty()
  @Column()
  user_id: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  uf: string;

  @ApiProperty()
  @Column()
  latitude: number;

  @ApiProperty()
  @Column()
  longitude: number;

  @JoinColumn({
    name: 'user_id',
  })
  @OneToOne(() => User)
  @ApiProperty({ type: () => User })
  user?: User;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
