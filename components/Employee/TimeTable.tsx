import addData from '@/firebase/firestore/addData';
import { Button, Table } from 'flowbite-react';
import { dateTime } from '@/utils/dateTime';
import { useAuth } from '@/context/AuthContext';
import { ITimeTable } from '@/types/timeTable.interface';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const TimeTable = ({ dateValue, data, hasTimeIn, hasTimeOut }: ITimeTable) => {
  const [isLogOut, setIsLogout] = useState(false);

  const router = useRouter();

  const { user, logOut } = useAuth();

  const { formattedDate, formattedDateOnly, formattedTime } =
    dateTime(dateValue);

  const timeIn = async () => {
    const { error } = await addData('timeIn', {
      timeIn: formattedTime,
      date: formattedDateOnly,
      timeStamp: dateValue,
      userId: user.uid,
    });
    if (error) {
      return console.log(error);
    }
    toast.success('Refresh to see changes', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const timeOut = async () => {
    const { error } = await addData('timeOut', {
      timeOut: formattedTime,
      date: formattedDateOnly,
      timeStamp: dateValue,
      userId: user.uid,
    });
    if (error) {
      return console.log(error);
    }
    toast.success('Refresh to see changes', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const logOutUser = () => {
    logOut();
    setIsLogout(true);
  };

  useEffect(() => {
    if (isLogOut) router.push('/auth/login');
  }, [isLogOut, router]);

  return (
    <div className="flex flex-col gap-4">
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell className="hidden md:flex">Day</Table.HeadCell>
          <Table.HeadCell>Time in</Table.HeadCell>
          <Table.HeadCell>Time out</Table.HeadCell>
          <Table.HeadCell className="hidden sm:flex">Work hours</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map(({ date, timeIn, timeOut, hours, day }, i) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {date}
                </Table.Cell>
                <Table.Cell className="hidden md:flex">{day}</Table.Cell>
                <Table.Cell>{timeIn}</Table.Cell>
                <Table.Cell>{timeOut}</Table.Cell>
                <Table.Cell className="hidden sm:flex">{hours}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <section className="flex flex-row gap-2 w-full justify-center sm:justify-end">
        <Button color="dark" onClick={timeIn} disabled={hasTimeIn}>
          Time In
        </Button>
        <Button
          color="dark"
          onClick={timeOut}
          disabled={!hasTimeIn || hasTimeOut}
        >
          Time Out
        </Button>
        <Button color="light" onClick={logOutUser}>
          Logout
        </Button>
        <ToastContainer autoClose={1000} />
      </section>
    </div>
  );
};

export default TimeTable;
