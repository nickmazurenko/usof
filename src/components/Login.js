import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFields } from '../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import { login as loginUser } from '../slices/auth/actions';
import Loading from './FormLoading';

const fields = loginFields;
const fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = '';
  return fieldsState[field.id];
});

const Login = () => {
  const { loading, error, isAuthenticated } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const authenticateUser = () => {
    dispatch(loginUser(loginState));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  return (
    <div className='container'>
      {loading ? (
        <Loading />
      ) : (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='-space-y-px'>
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
          </div>
          <FormExtra />
          <FormAction handleSubmit={handleSubmit} text='Login' />
        </form>
      )}
    </div>
  );
};

export default Login;
