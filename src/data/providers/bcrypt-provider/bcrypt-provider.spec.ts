import { BcryptProvider } from './bcrypt.provider';

describe('Bcrypt Provider', () => {
  let bcryptProvider: BcryptProvider;

  beforeEach(async () => {
    bcryptProvider = new BcryptProvider();
  });

  it('should be able to enctypt a password', async () => {
    const passwordHash = await bcryptProvider.hash('123456');

    expect(passwordHash).toBeDefined();
    expect(typeof passwordHash).toBe('string');
  });

  it('should be able to compare a raw password and an encrypted one', async () => {
    const passwordHash = await bcryptProvider.hash('123456');
    const passwordMatch = await bcryptProvider.compare('123456', passwordHash);

    expect(passwordMatch).toBeDefined();
    expect(passwordMatch).toBeTruthy();
  });
});
