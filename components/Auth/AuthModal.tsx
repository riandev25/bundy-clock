import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';

const AuthModal = () => {
  const [isClose, setIsClose] = useState(true);

  console.log(isClose);
  const onClose = () => {
    setIsClose(false);
  };

  return (
    <React.Fragment>
      <Modal show={isClose} onClose={onClose}>
        <Modal.Header className="text-xl text-semibold">
          Sample Accounts
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className="text-lg font-medium mb-1">ADMIN ACCOUNT</h2>
              <h4 className="text-gray-700 text-sm sm:text-base">
                EMAIL: company_admin@gmail.com
              </h4>
              <h4 className="text-gray-700 text-sm sm:text-base">
                PASSWORD: company_admin
              </h4>
            </div>
            <div className="">
              <h2 className="text-lg font-medium mb-1">EMPLOYEE ACCOUNT</h2>
              <h4 className="text-gray-700 text-sm sm:text-base">
                EMAIL: company_employee@gmail.com
              </h4>
              <h4 className="text-gray-700 text-sm sm:text-base">
                PASSWORD: company_employee
              </h4>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Note: Only admin can register an employee.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AuthModal;
