import { Injectable, Logger } from '@nestjs/common';
import type { BFImgCreateDTOType } from '../../types/img.type';

@Injectable()
export class ImgService {
  private readonly logger = new Logger(ImgService.name);
  imgs: BFImgCreateDTOType[] = [];
  create(createImgDto: BFImgCreateDTOType): number {
    return this.imgs.push(createImgDto);
  }

  findAll() {
    this.logger.log(`This action returns all img`);
    return `This action returns all img`;
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
