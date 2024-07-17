import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import configFactory from './config/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image/entities/image';

const config = configFactory();

console.log(config);

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configFactory], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      // entities: [ImgEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
