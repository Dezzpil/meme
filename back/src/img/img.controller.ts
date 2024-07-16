import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { ZodValidationPipe } from '../zod.pipe';
import { BFImgCreateDTO, BFImgCreateDTOType } from '../../types/img.type';

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(BFImgCreateDTO))
  create(@Body() createImgDto: BFImgCreateDTOType) {
    return this.imgService.create(createImgDto);
  }

  @Get()
  findAll() {
    return this.imgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgDto: any) {
    return this.imgService.update(+id, updateImgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}
