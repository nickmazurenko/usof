import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HiBadgeCheck } from 'react-icons/hi';
import { resetPasswordFields } from '../../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { resetPasswordToken } from '../../features/auth/actions';
import Loading from './FormLoading';

const fields = resetPasswordFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = '';
  return fieldsState[field.id];
});

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const [passwordState, setPasswordState] = useState(fieldsState);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    return setPasswordState({
      ...passwordState,
      [e.target.id]: e.target.value,
    });
  };

  const resetPassword = () => {
    dispatch(resetPasswordToken(passwordState, params.token));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
        return setSuccess(false);
      }, 3000);
    }
    resetPassword();
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
            <div>
              {fields.map((field) => {
                return (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={passwordState[field.id]}
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
              <FormAction handleSubmit={handleSubmit} text='Confirm' />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
