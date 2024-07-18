import { Injectable } from '@nestjs/common';
import type { BFImgCreateDTOType } from '../../types/image.type';
import { Repository } from 'typeorm';
import { Image } from './entities/image';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imagesRepo: Repository<Image>) {}

  async create(createImgDto: BFImgCreateDTOType): Promise<Image> {
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

  findOne(id: number) {
    return `This action returns a #${id} img`;
  }

  update(id: number, updateImgDto: any) {
    return `This action updates a #${id} img`;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
