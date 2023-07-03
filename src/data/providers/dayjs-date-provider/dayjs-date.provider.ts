import { DateProvider } from '../../../domain/providers/date-provider';

export class DayJsDateProvider implements DateProvider {
  dateNow(): Date {
    return new Date();
  }

  convertToUTC(date: Date): string {
    return new Date(date).toUTCString();
  }

  dateAddDay(date: Date, days: number): Date {
    const currentDate = new Date(date);

    currentDate.setDate(currentDate.getDate() + days);

    return currentDate;
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const startDate = new Date(start_date);
    const endEnd = new Date(end_date);

    const diffTime = Math.abs(endEnd.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const startDate = new Date(start_date);
    const endEnd = new Date(end_date);

    return endEnd.getHours() - startDate.getHours();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    const startDate = new Date(start_date);
    const endEnd = new Date(end_date);

    return startDate.getTime() < endEnd.getTime();
  }

  addDays(days: number): Date {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + days);

    return currentDate;
  }

  addHours(hours: number): Date {
    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + hours);

    return currentDate;
  }
}
