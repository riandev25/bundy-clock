import { Dispatch, SetStateAction } from 'react';
import { IDateTime } from './dateTime.interface';

export interface IDrawer extends IDateTime {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isDrawerOpen: boolean;
}
