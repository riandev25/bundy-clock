import { ICombineTimeInOut } from '@/types/combineTimeInOut.interface';

export const combineTimeAdmin = (
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

      const key = `${userId}_${date}`;
      if (!acc[key]) {
        acc[key] = { id, userId, date, day, timeIn, timeOut, timeInTimestamp };
      } else {
        acc[key].id = id;
        acc[key].timeOut = timeOut;
        const timeOutTimestamp = new Date(
          timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
        );
        acc[key].hours = Math.max(
          Math.round(
            (+timeOutTimestamp - acc[key].timeInTimestamp) / 1000 / 60 / 60
          ),
          0
        );
      }

      return acc;
    }, {})
  );

  return combinedData;
};
