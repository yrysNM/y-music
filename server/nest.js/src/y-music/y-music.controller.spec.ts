import { Test, TestingModule } from '@nestjs/testing';
import { YMusicController } from './y-music.controller';

describe('YMusicController', () => {
  let controller: YMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YMusicController],
    }).compile();

    controller = module.get<YMusicController>(YMusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
