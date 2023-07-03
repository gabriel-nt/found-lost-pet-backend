import { JwtProvider } from './jwt.provider';

describe('Jwt Provider', () => {
  let jwtProvider: JwtProvider;

  beforeEach(async () => {
    jwtProvider = new JwtProvider();
  });

  it('should be able to encode a value', async () => {
    const token = jwtProvider.sign({ id: 'uuid' }, 'some_secret_key', {
      subject: 'id',
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should be able to decode a value', async () => {
    const token = jwtProvider.sign({ id: 'uuid' }, 'some_secret_key', {
      subject: 'id',
    });

    const payload: any = await jwtProvider.verify(token, 'some_secret_key');

    expect(payload).toBeDefined();
    expect(payload).toHaveProperty('sub');
    expect(payload.sub).toEqual('id');
  });
});
