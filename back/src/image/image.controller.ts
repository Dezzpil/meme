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
import { ImageService } from './image.service';
import { ZodValidationPipe } from '../zod.pipe';
import { BFImgCreateDTO, BFImgCreateDTOType } from '../../types/image.type';

@Controller('image')
export class ImageController {
  constructor(private readonly imgService: ImageService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(BFImgCreateDTO))
  async create(@Body() createImgDto: BFImgCreateDTOType) {
    return this.imgService.create(createImgDto);
  }

  @Get()
  async findAll() {
    return this.imgService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateImgDto: any) {
    return this.imgService.update(+id, updateImgDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}
