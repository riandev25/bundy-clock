import { Dispatch, SetStateAction } from 'react';
import { ICombineTimeInOut } from './combineTimeInOut.interface';

export interface IDateTime {
  dateValue: Date;
  data: ICombineTimeInOut[];
  setDateValue: Dispatch<SetStateAction<Date>>;
}
