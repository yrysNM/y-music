import { Test, TestingModule } from '@nestjs/testing';
import { YMusicService } from './y-music.service';

describe('YMusicService', () => {
  let service: YMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YMusicService],
    }).compile();

    service = module.get<YMusicService>(YMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
