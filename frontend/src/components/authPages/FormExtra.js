import ForgotPasswordModal from './ForgotPasswordModal';

const FormExtra = () => {
  return (
    <div className='flex items-center justify-between '>
      <div className='flex items-center'>
        <input
          id='remember-me'
          name='remember-me'
          type='checkbox'
          className='h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded'
        />
        <label htmlFor='remember-me' className='ml-2 block text-sm text-white'>
          Remember me
        </label>
      </div>

      <div className='text-sm'>
        <ForgotPasswordModal />
      </div>
    </div>
  );
};

export default FormExtra;
