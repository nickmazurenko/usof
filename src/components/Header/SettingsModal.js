import { Fragment, useState } from 'react';
import { Modal, Label, TextInput, Spinner } from 'flowbite-react';
import { HiUpload } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { updateAvatar, updateUser } from '../../features/users/actions';

const SettingsModal = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    login: user.login,
    fullName: user.fullName,
    email: user.email,
    avatar: user.profilePicture,
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormState({
        ...formState,
        [e.target.name]: url,
        file: e.target.files[0],
      });
    } else setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSaveChanges = () => {
    const inputs = {
      ...(formState.login !== user.login ? { login: formState.login } : {}),
      ...(formState.fullName !== user.fullName
        ? { fullName: formState.fullName }
        : {}),
      ...(formState.email !== user.email ? { email: formState.email } : {}),
    };
    if (formState.file) dispatch(updateAvatar(formState.file));
    dispatch(updateUser(inputs, user.id));
    setLoading(true);
    setTimeout(() => {
      return setLoading(false);
    }, 5000);
  };

  return (
    <Fragment>
      <span className='w-full h-full'

        onClick={() => {
          setShowModal(!showModal);
        }}>
        Settings
      </span>

      <Modal
        show={showModal}
        size='xl'
        popup={true}
        color='dark'
        onClose={() => {
          setShowModal(!showModal);
        }}>
        <Modal.Header>
          <div className='m-2 text-gray-400'>Settings</div>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className='flex justify-center items-center'>
              <Spinner color='success' size='xl' />
            </div>
          ) : (
            <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
              <div className='flex items-center justify-center w-full pt-5'>
                <img
                  crossOrigin='anonymous'
                  src={formState.avatar}
                  className='z-20 hover:z-0 rounded-full w-1/2 shadow-md border-4 border-white'></img>
                <div className=' opacity-0 top-30 z-10 hover:z-30 absolute flex justify-center items-center transition duration-400 transform hover:opacity-80'>
                  <label
                    htmlFor='dropzone-file'
                    className=' flex items-center w-2/3 md:w-full md:px-8 md:py-20 justify-center rounded-full cursor-pointer bg-gray-700'>
                    <div className='flex flex-col justify-center items-center pt-5 pb-6'>
                      <HiUpload color='white' size='35' />
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>
                          Click to upload or drag and drop
                        </span>
                      </p>
                    </div>
                    <input
                      name='avatar'
                      id='dropzone-file'
                      onChange={handleChange}
                      accept='image/*'
                      type='file'
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='base' value='Login' />
                  </div>
                  <TextInput
                    name='login'
                    onChange={handleChange}
                    value={formState.login}
                    type='text'
                    sizing='md'
                  />
                </div>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='base' value='Full name' />
                  </div>
                  <TextInput
                    name='fullName'
                    onChange={handleChange}
                    value={formState.fullName}
                    type='text'
                    sizing='md'
                  />
                </div>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='base' value='Email' />
                  </div>
                  <TextInput
                    name='email'
                    onChange={handleChange}
                    value={formState.email}
                    type='text'
                    sizing='md'
                  />
                </div>
              </div>
              <div
                onClick={onSaveChanges}
                className='mt-5 w-full p-4 bg-gray-900 text-center rounded-xl border-2 cursor-pointer text-md md:text-xl text-gray-300 font-bold'>
                Save changes
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default SettingsModal;
