import { RosModule } from './ros.module';

describe('RosModule', () => {
  let rosModule: RosModule;

  beforeEach(() => {
    rosModule = new RosModule();
  });

  it('should create an instance', () => {
    expect(rosModule).toBeTruthy();
  });
});
