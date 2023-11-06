import { Folder } from "src/folder/entities/folder.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  tripId: number

  @Column()
  destination: string

  @Column()
  origin: string

  @Column()
  distance: string

  @Column({type:'float'})
  price: number

  @Column()
  departure_date: string

  @Column()
  return_date: string

  @ManyToOne(() => User, (user) => user.trips)
  user_id: User

  @ManyToMany(() => Folder, (folder) => folder.trips)
  folders: Folder[]
}
