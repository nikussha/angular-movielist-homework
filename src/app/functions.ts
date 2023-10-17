import { Errormessage, Movie } from './models';

export function isError(val: Movie | Errormessage): val is Errormessage {
  return (val as Errormessage).Response === 'False';
}

export function isNull(value: any): value is null {
  return value === null;
}
