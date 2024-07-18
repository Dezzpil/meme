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
import { bfImageCreateDTO, bfImageCreateDTOType } from 'types/image.type';

@Controller('image')
export class ImageController {
  constructor(private readonly imgService: ImageService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(bfImageCreateDTO))
  async create(@Body() createImgDto: bfImageCreateDTOType) {
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
