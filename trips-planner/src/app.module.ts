import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from './common/common.module'
import { UserModule } from './user/user.module'
import { FolderModule } from './folder/folder.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'trip',
      autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES === 'true',
      synchronize: process.env.DATABASE_SYNCHORNIZE === 'true',
    }),
    CommonModule,
    UserModule,
    FolderModule,
    TripModule,
  ]
})
export class AppModule {}
