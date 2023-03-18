import { ICombineTimeInOut } from './combineTimeInOut.interface';

export interface ITimeTable {
  dateValue: Date;
  data: ICombineTimeInOut[];
  hasTimeIn?: boolean;
  hasTimeOut?: boolean;
}
