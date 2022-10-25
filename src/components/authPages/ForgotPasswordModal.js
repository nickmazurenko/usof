import { Fragment, useState } from 'react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';

const ForgotPasswordModal = () => {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  return (
    <Fragment>
      <Button onClick={onClick}>Toggle modal</Button>
      <Modal show={show} size='md' popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              Sign in to our platform
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Your email' />
              </div>
              <TextInput
                id='email'
                placeholder='name@company.com'
                required={true}
              />
            </div>
            <div className='w-full'>
              <Button>Log in to your account</Button>
            </div>
            <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
              Not registered?{' '}
              <a
                href='/modal'
                className='text-blue-700 hover:underline dark:text-blue-500'>
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ForgotPasswordModal;
