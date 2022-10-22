import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { register as registerUser } from '../slices/auth/actions';
import Loading from './FormLoading';

const fields = registerFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = '';
  return fieldsState[field.id];
});

const Register = () => {
  const { loading, error } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const [registerState, setRegisterState] = useState(fieldsState);

  const handleChange = (e) => {
    return setRegisterState({
      ...registerState,
      [e.target.id]: e.target.value,
    });
  };

  const createAccount = () => {
    dispatch(registerUser(registerState));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  return (
    <div className='container'>
      {loading ? (
        <Loading count={5} additional={false} />
      ) : (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className=''>
            {fields.map((field) => {
              return (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={registerState[field.id]}
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
            <FormAction handleSubmit={handleSubmit} text='Signup' />
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
