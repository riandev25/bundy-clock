import { IDateTime } from '@/types/dateTime.interface';
import DateTime from './DateTime';
import { Button } from 'flowbite-react';
import { IDrawer } from '@/types/drawer.interface';

const Drawer = ({
  dateValue,
  setDateValue,
  data,
  setDrawerOpen,
  isDrawerOpen,
}: IDrawer) => {
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div
      id="drawer-left-example"
      className="fixed flex sm:hidden top-0 left-0 z-20 min-h-screen p-4 overflow-y-scroll transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
    >
      <div className="relative flex flex-col items-end">
        <Button color="dark" onClick={closeDrawer}>
          OFF
        </Button>
        <DateTime
          dateValue={dateValue}
          setDateValue={setDateValue}
          data={data}
        />
      </div>
    </div>
  );
};

export default Drawer;
