import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class YMusicService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const createdTrack = await this.trackModel.create(createTrackDto);
    return createdTrack;
  }

  // async upload()
}
