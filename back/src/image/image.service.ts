import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image';
import axios from 'axios';
import {
  bfImageCreateDTOType,
  bfImageMessageDTODownloadType,
} from '../../types/image.type';
import { InjectRepository } from '@nestjs/typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private readonly imagesRepo: Repository<Image>,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createImgDto: bfImageCreateDTOType): Promise<Image> {
    const response = await axios.head(createImgDto.url, {
      signal: AbortSignal.timeout(2000),
    });
    const image = await this.imagesRepo.save({
      url: createImgDto.url,
      headers: response.headers,
    });
    // TODO вынести в константу exchange
    await this.amqpConnection.publish<bfImageMessageDTODownloadType>(
      'amq.direct',
      'download',
      { id: image.id, url: image.url },
    );
    return image;
  }

  async findAll(): Promise<Image[]> {
    return await this.imagesRepo.find();
  }

  async findOne(id: number) {
    return await this.imagesRepo.findOneOrFail({ where: { id } });
  }

  update(id: number, updateImgDto: any) {
    return `This action updates a #${id} img`;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
