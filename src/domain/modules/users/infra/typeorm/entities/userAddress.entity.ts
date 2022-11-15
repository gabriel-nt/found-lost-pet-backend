import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
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
  street: string;

  @ApiProperty()
  @Column()
  zipCode: string;

  @ApiProperty()
  @Column()
  complement?: string;

  @ApiProperty()
  @Column()
  district: string;

  @ApiProperty()
  @Column()
  neighborhood: string;

  @ApiProperty()
  @Column()
  number: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  state: string;

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
  user: User;

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
