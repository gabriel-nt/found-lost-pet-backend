import { DayJsDateProvider } from './dayjs-date.provider';

describe('Dayjs Date Provider', () => {
  let dayJsDateProvider: DayJsDateProvider;

  beforeEach(async () => {
    vi.useFakeTimers();

    dayJsDateProvider = new DayJsDateProvider();
  });

  it('should return the tomorrow date', async () => {
    const date = dayJsDateProvider.addDays(1);

    expect(date).toBeDefined();
    expect(new Date(date).getDate()).toBe(new Date().getDate() + 1);
  });

  it('should returfuture date', async () => {
    const date = dayJsDateProvider.dateNow();

    expect(date).toBeDefined();
    expect(new Date(date)).toStrictEqual(new Date());
  });

  it('should return the utc date', async () => {
    const utcDate = dayJsDateProvider.convertToUTC(new Date(2012, 6, 12));

    expect(utcDate).toBeDefined();
    expect(typeof utcDate).toStrictEqual('string');
  });

  it('should return the date two days after the date passed', async () => {
    const newDate = dayJsDateProvider.dateAddDay(new Date(2012, 6, 12), 2);

    expect(newDate).toBeDefined();
    expect(newDate).toStrictEqual(new Date(2012, 6, 14));
  });

  it('should return the date plus 2 hours', async () => {
    const newDate = dayJsDateProvider.addHours(3);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);

    expect(newDate).toBeDefined();
    expect(newDate.getHours()).toStrictEqual(currentDate.getHours());
  });

  it('should be able to return the difference in hours between two dates', async () => {
    const hoursDifference = dayJsDateProvider.compareInHours(
      new Date(),
      new Date(),
    );

    expect(hoursDifference).toBeDefined();
    expect(hoursDifference).toEqual(0);
  });

  it('should be able to return the difference in days between two dates', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const daysDifference = dayJsDateProvider.compareInDays(
      new Date(),
      futureDate,
    );

    expect(daysDifference).toBeDefined();
    expect(daysDifference).toEqual(2);
  });

  it('should be able to return the difference in days between two dates', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const isBefore = dayJsDateProvider.compareIfBefore(new Date(), futureDate);

    expect(isBefore).toBeDefined();
    expect(isBefore).toBeTruthy();
  });
});
