import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiBadgeCheck } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { registerFields } from '../../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { register as registerUser } from '../../features/auth/actions';
import Loading from './FormLoading';

const fields = registerFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = '';
  return fieldsState[field.id];
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerState, setRegisterState] = useState(fieldsState);
  const [success, setSuccess] = useState(false);

  const { loading, error, registerSuccess } = useSelector((state) => {
    return state.auth;
  });

  const handleChange = (e) => {
    return setRegisterState({
      ...registerState,
      [e.target.id]: e.target.value,
    });
  };

  const createAccount = () => {
    dispatch(registerUser(registerState));
  };

  useEffect(() => {
    if (registerSuccess) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
        return setSuccess(false);
      }, 1000);
    }
  }, [registerSuccess]);

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
          {success ? (
            <div className='flex justify-center items-center text-9xl text-center text-white'>
              <HiBadgeCheck />
            </div>
          ) : (
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
          )}
        </form>
      )}
    </div>
  );
};

export default Register;
