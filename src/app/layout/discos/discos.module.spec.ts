import { DiscosModule } from './discos.module';

describe('DiscosModule', () => {
  let discosModule: DiscosModule;

  beforeEach(() => {
    discosModule = new DiscosModule();
  });

  it('should create an instance', () => {
    expect(discosModule).toBeTruthy();
  });
});
