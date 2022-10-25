import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'flowbite-react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { loginFields } from '../../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import { login as loginUser } from '../../features/auth/actions';
import Loading from './FormLoading';

const fields = loginFields;
const fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = '';
  return fieldsState[field.id];
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);
  const [success, setSuccess] = useState(false);
  const { loading, error, isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const authenticateUser = () => {
    dispatch(loginUser(loginState));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile', { replace: true });
        return setSuccess(false);
      }, 1000);
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  return (
    <div className='container'>
      {error ? (
        <Alert color='failure'>
          <span>
            <span className='font-medium'>{error.code}</span>
            <p>{error.message}</p>
          </span>
        </Alert>
      ) : null}
      {loading ? (
        <Loading />
      ) : (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {success ? (
            <div className='flex justify-center items-center text-9xl text-center text-white'>
              <HiBadgeCheck />
            </div>
          ) : (
            <div className='space-y-6'>
              {fields.map((field) => {
                return (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={loginState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                );
              })}
              <FormExtra />
              <FormAction handleSubmit={handleSubmit} text='Login' />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Login;
