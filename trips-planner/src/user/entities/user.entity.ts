import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Status } from '../enum/status'
import { Folder } from 'src/folder/entities/folder.entity'
import { Trip } from 'src/trip/entities/trip.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({unique: true})
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  password: string

  @Column({type: 'timestamp'})
  create_at: number

  @Column({ type: 'timestamp' })
  update_at: number

  @OneToMany(() => Trip, (trip) => trip.user_id)
  trips: Trip[]

  @OneToMany(() => Folder, (folder) => folder.user_id)
  folders: Folder[]

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OFFLINE,
    comment: '状态',
  })
  status: Status
}
