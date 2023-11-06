import { Trip } from "src/trip/entities/trip.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  folderId: number

  @ManyToOne(() => User, (user) => user.folders)
  user_id: User

  @ManyToMany(() => Trip, (trip) => trip.folders)
  @JoinTable()
  trips: Trip[]

  @Column()
  name: string
}
