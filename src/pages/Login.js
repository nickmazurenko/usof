import Header from '../components/Auth/Header';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <>
      <Header
        heading='Login to your account'
        paragraph="Don't have an account yet?"
        linkName='Sign Up'
        linkUrl='/register'
      />
      <Login/>
    </>
  );
};

export default LoginPage;
