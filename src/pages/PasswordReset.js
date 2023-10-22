import Header from '../components/authPages/FormHeader';
import ResetPassword from '../components/authPages/ResetPassword';

const PasswordResetPage = () => {
  return (
    <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <Header
          heading='Write your new password'
          paragraph='Remembered old one? '
          linkName='Login'
          linkUrl='/login'
        />
        <ResetPassword />
      </div>
    </div>
  );
};

export default PasswordResetPage;
