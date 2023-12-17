import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { YMusicService } from './y-music.service';

@Controller('y-music')
export class YMusicController {
  constructor(private readonly trackService: YMusicService) {}
  @Get()
  getTracks() {
    return {};
  }

  @Get(':id')
  getOneTrack(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }

  @Post()
  createTrack(@Body() id: string) {
    return {
      id,
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    // const trackname = file.originalname;
    // const bucket =  new mongoose.mongo.GridFSBucket(client)
    console.log(file);
    return this.trackService.create({
      title: 'test',
      subtitle: 'test',
      url: 'http://localhost',
      images: {
        background: 'test',
      },
    });
  }
}
