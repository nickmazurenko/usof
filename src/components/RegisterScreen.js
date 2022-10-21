import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../slices/auth/actions';

const RegisterScreen = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
    }

    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* render error message with Error component, if any */}
      {error && <Error>{error}</Error>}
      <div className='form-group'>
        <label htmlFor='Full Name'>Full Name</label>
        <input
          type='text'
          className='form-input'
          {...register('fullName')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='Login'>Login</label>
        <input
          type='text'
          className='form-input'
          {...register('login')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        Register
      </button>
    </form>
  );
};

export default RegisterScreen;
