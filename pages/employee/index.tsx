import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useVerifyUser } from '@/hooks/useVerifyUser';
import { Button, Table } from 'flowbite-react';
import { useState, useEffect } from 'react';
import 'react-clock/dist/Clock.css';
import { dateTime } from '@/utils/dateTime';
import { useAuth } from '@/context/AuthContext';
import getData from '@/firebase/firestore/getData';
import TimeTable from '@/components/Employee/TimeTable';
import DateTime from '@/components/Employee/DateTime';
import { combineTimeInOut } from '@/utils/combineTimeInOut';
import Drawer from '@/components/Employee/Drawer';
import { ICombineTimeInOut } from '@/types/combineTimeInOut.interface';

const inter = Inter({ subsets: ['latin'] });

const Employee = () => {
  useVerifyUser();

  const [dateValue, setDateValue] = useState(new Date());
  const [timeInData, setTimeInData] = useState<any>(null);
  const [timeOutData, setTimeOutData] = useState<any>(null);
  const [data, setData] = useState<ICombineTimeInOut[]>([]);
  const [hasTimeIn, setHasTimeIn] = useState(false);
  const [hasTimeOut, sethasTimeOut] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { user } = useAuth();
  const { formattedDateOnly } = dateTime(dateValue);

  useEffect(() => {
    getData('timeIn', user.uid).then(({ result, error }) => {
      if (error) {
        console.error(error);
      } else {
        setTimeInData(result);
      }
    });

    getData('timeOut', user.uid).then(({ result, error }) => {
      if (error) {
        console.error(error);
      } else {
        setTimeOutData(result);
      }
    });
  }, [user.uid]);

  useEffect(() => {
    if (timeInData && timeOutData) {
      const combinedData = combineTimeInOut(timeInData, timeOutData);
      setData(combinedData);
    }
  }, [timeInData, timeOutData]);

  useEffect(() => {
    const currentDate = data?.find(({ date, timeIn, timeOut }) => {
      if (date === formattedDateOnly) {
        return { timeIn, timeOut };
      }
      return;
    });
    if (currentDate?.timeIn) setHasTimeIn(true);
    if (currentDate?.timeOut) sethasTimeOut(true);
  }, [data, formattedDateOnly]);

  return user.uid ? (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-row justify-center p-4 gap-6 min-h-screen w-full from-gray-500 to-gray-300 bg-gradient-to-r">
        <div className="hidden h-full sm:flex">
          <DateTime
            dateValue={dateValue}
            setDateValue={setDateValue}
            data={data}
          />
        </div>
        <TimeTable
          dateValue={dateValue}
          data={data}
          hasTimeIn={hasTimeIn}
          hasTimeOut={hasTimeOut}
        />
        <Button
          className="absolute sm:hidden top-1/2 left-0 rounded-l-none rounded-full"
          color="dark"
          onClick={() => setDrawerOpen(true)}
        >
          ON
        </Button>
        {isDrawerOpen ? (
          <Drawer
            dateValue={dateValue}
            setDateValue={setDateValue}
            setDrawerOpen={setDrawerOpen}
            isDrawerOpen={isDrawerOpen}
            data={data}
          />
        ) : null}
      </main>
    </>
  ) : null;
};

export default Employee;
