import { randomUUID } from 'crypto';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities';
import { Disappearance } from '../../disappearances/entities';

@Entity('comments')
export class Comment {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @Exclude()
  @ApiProperty()
  disappearance_id: string;

  @JoinColumn({
    name: 'disappearance_id',
  })
  @OneToOne(() => Disappearance)
  @ApiProperty()
  disappearance?: Disappearance;

  @Column()
  @Exclude()
  @ApiProperty()
  user_id: string;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User)
  @ApiProperty()
  user?: User;

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
