import { useAuth } from '@/context/AuthContext';
import getData from '@/firebase/firestore/getData';
import { IDateTime } from '@/types/dateTime.interface';
import { ICombineTimeInOut } from '@/types/combineTimeInOut.interface';
import { dateTime } from '@/utils/dateTime';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Clock from 'react-clock';

const DateTime = ({ dateValue, data, setDateValue }: IDateTime) => {
  const { formattedDate, formattedTime, formattedDateOnly } =
    dateTime(dateValue);

  const currentDate = data?.find(({ date, timeIn, timeOut }) => {
    if (date === formattedDateOnly) {
      return { timeIn, timeOut };
    }
    return;
  });

  return (
    <section className="sticky flex flex-col sm:gap-10">
      <div className="flex flex-col justify-center items-center p-4 rounded-lg gap-3 sm:gap-4 bg-white drop-shadow-xl">
        <p className="text-lg font-medium">Current time:</p>
        <Clock value={dateValue} />
      </div>
      <div className="flex flex-col justify-center items-center p-4 rounded-lg gap-3 sm:gap-4 bg-white drop-shadow-xl">
        <p className="text-lg font-medium">Current date:</p>
        <p>{formattedDate}</p>
      </div>
      <div className="flex flex-col justify-center items-center p-4 rounded-lg gap-3 sm:gap-4 bg-white drop-shadow-xl">
        <p className="text-lg font-medium">Time in:</p>
        <p>{currentDate?.timeIn}</p>
      </div>
      <div className="flex flex-col justify-center items-center p-4 rounded-lg gap-3 sm:gap-4 bg-white drop-shadow-xl">
        <p className="text-lg font-medium">Time out:</p>
        <p>{currentDate?.timeOut}</p>
      </div>
    </section>
  );
};

export default DateTime;
