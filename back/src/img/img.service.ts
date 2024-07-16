import { Injectable } from '@nestjs/common';
import type { BFImgCreateDTOType } from '../../types/img.type';

@Injectable()
export class ImgService {
  imgs: BFImgCreateDTOType[] = [];
  create(createImgDto: BFImgCreateDTOType): number {
    return this.imgs.push(createImgDto);
  }

  findAll() {
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
