import { Module } from '@nestjs/common';

import { YMusicController } from './y-music.controller';
import { YMusicService } from './y-music.service';
import { databaseProviders } from './db/databse.providers';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Track.name, schema: TrackSchema }],
      'y-music',
    ),
  ],
  controllers: [YMusicController],
  providers: [YMusicService, ...databaseProviders],
})
export class YMusicModule {}
