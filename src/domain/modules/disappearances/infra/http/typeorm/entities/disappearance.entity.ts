import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../../../../users/infra/typeorm/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity('disappearances')
export class Disappearance {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  situation: 'MISSING' | 'FOUND' | 'SIGHTED';

  @Column()
  @ApiProperty()
  type: string;

  @Column()
  @ApiProperty()
  latitude: number;

  @Column()
  @ApiProperty()
  longitude: number;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  uf: string;

  @Column()
  @Exclude()
  @ApiProperty()
  user_id: string;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User)
  @ApiProperty()
  user: User;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
