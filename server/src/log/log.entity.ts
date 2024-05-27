import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  actionType: string;

  @Column()
  timestamp: Date;

  @Column({ nullable: true })
  metadata: string;
}
