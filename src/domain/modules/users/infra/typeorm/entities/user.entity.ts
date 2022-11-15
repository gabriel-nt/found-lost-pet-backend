import { UserAddress } from './userAddress.entity';
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
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ type: () => UserAddress })
  @OneToOne(() => UserAddress, (address) => address.user)
  address: UserAddress;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
