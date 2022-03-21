import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { articlesService } from './articles.service';

@Controller('Articles')
export class articlesController {
  constructor(private readonly articlesService: articlesService) {}

  @Post()
  addarticle(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.articlesService.insertarticle(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllarticles() {
    return this.articlesService.getarticles();
  }

  @Get(':id')
  getarticle(@Param('id') prodId: string) {
    return this.articlesService.getSinglearticle(prodId);
  }

  @Patch(':id')
  updatearticle(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.articlesService.updatearticle(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  removearticle(@Param('id') prodId: string) {
      this.articlesService.deletearticle(prodId);
      return null;
  }
}
