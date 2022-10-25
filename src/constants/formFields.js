const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const resetPasswordFields = [
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirmPassword',
    type: 'password',
    autoComplete: 'confirm-password',
    isRequired: true,
    placeholder: 'Confirm Password',
  },
];
const registerFields = [
  {
    labelText: 'Login',
    labelFor: 'login',
    id: 'login',
    type: 'text',
    autoComplete: 'login',
    isRequired: true,
    placeholder: 'Login',
  },
  {
    labelText: 'Full Name',
    labelFor: 'full-name',
    id: 'fullName',
    type: 'text',
    autoComplete: 'fullName',
    isRequired: false,
    placeholder: 'Full Name',
  },
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirmPassword',
    type: 'password',
    autoComplete: 'confirm-password',
    isRequired: true,
    placeholder: 'Confirm Password',
  },
];

export { loginFields, registerFields, resetPasswordFields };
