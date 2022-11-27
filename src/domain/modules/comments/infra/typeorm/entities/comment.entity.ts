import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Disappearance } from '../../../../disappearances/infra/http/typeorm/entities/disappearance.entity';
import { User } from '../../../../users/infra/typeorm/entities/user.entity';
import { Exclude } from 'class-transformer';

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
  disappearance: Disappearance;

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
