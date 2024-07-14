import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImgModule } from './img/img.module';

@Module({
  imports: [ImgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
