import { SlideshareModule } from './slideshare.module';

describe('SlideshareModule', () => {
  let slideshareModule: SlideshareModule;

  beforeEach(() => {
    slideshareModule = new SlideshareModule();
  });

  it('should create an instance', () => {
    expect(slideshareModule).toBeTruthy();
  });
});
