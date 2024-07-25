import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    // TODO вынести в конфиг
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: 'amq.direct', type: 'direct' }],
      uri: 'amqp://admin:admin@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
