import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image';
import axios from 'axios';
import { bfImageCreateDTOType } from '../../types/image.type';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imagesRepo: Repository<Image>) {}

  async create(createImgDto: bfImageCreateDTOType): Promise<Image> {
    const response = await axios.head(createImgDto.url, {
      signal: AbortSignal.timeout(1000),
    });
    return await this.imagesRepo.save({
      url: createImgDto.url,
      headers: response.headers,
    });
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
