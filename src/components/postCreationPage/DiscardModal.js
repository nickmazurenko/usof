/* eslint-disable arrow-body-style */
import { Fragment, useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DiscardModal = ({ submit, disabled }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Button disabled={disabled} onClick={() => setShow(!show)}>Discard</Button>
      <Modal show={show} size='md' popup={true} onClose={() => setShow(!show)}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this product?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => submit(true)}>
                Yes, I&apos;m sure
              </Button>
              <Button color='gray' onClick={() => setShow(!show)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default DiscardModal;
