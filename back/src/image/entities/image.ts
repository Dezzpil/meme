import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ update: false })
  url: string;

  @Column({ type: 'json', update: false })
  headers: Record<string, any>;

  @Column({ nullable: true, default: null, insert: false })
  downloadedAt: Date;

  @Column({ nullable: true, default: null, insert: false })
  error: string;

  @Column({ nullable: true, default: null, insert: false })
  contentType: string;

  @Column({ nullable: true, default: null, insert: false })
  path: string;

  @Column({ nullable: true, default: null, insert: false })
  bytes: number;
}
