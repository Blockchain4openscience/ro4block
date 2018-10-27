import { FigshareModule } from './figshare.module';

describe('FigshareModule', () => {
  let figshareModule: FigshareModule;

  beforeEach(() => {
    figshareModule = new FigshareModule();
  });

  it('should create an instance', () => {
    expect(figshareModule).toBeTruthy();
  });
});
