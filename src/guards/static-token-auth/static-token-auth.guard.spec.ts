import { StaticTokenAuthGuard } from './static-token-auth.guard';

describe('StaticTokenAuthGuard', () => {
  it('should be defined', () => {
    expect(new StaticTokenAuthGuard()).toBeDefined();
  });
});
