import Header from '../components/FormHeader';
import Login from '../components/Login';

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
