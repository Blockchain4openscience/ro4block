import { OpenaireModule } from './openaire.module';

describe('OpenaireModule', () => {
  let openaireModule: OpenaireModule;

  beforeEach(() => {
    openaireModule = new OpenaireModule();
  });

  it('should create an instance', () => {
    expect(openaireModule).toBeTruthy();
  });
});
