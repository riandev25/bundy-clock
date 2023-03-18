import { ICombineTimeInOut } from '@/types/combineTimeInOut.interface';

export const combineTimeInOut = (
  timeInData: any,
  timeOutData: any
): ICombineTimeInOut[] => {
  const newArray = [...timeInData, ...timeOutData];
  const combinedData: ICombineTimeInOut[] = Object.values(
    newArray.reduce((acc, curr) => {
      const { id, userId, timeStamp, date, timeIn, timeOut } = curr;
      const timeInTimestamp = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
      );
      const day = timeInTimestamp.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      if (!acc[date]) {
        acc[date] = { date, day, timeIn, timeOut, timeInTimestamp };
      } else {
        const timeOutTimestamp = new Date(
          timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
        );
        acc[date].timeOut = timeOut;
        acc[date].hours = Math.max(
          Math.round(
            (+timeOutTimestamp - acc[date].timeInTimestamp) / 1000 / 60 / 60
          ),
          0
        );
        delete acc[date].timeInTimestamp;
      }

      return acc;
    }, {})
  );
  return combinedData;
};
