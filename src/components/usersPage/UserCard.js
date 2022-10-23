import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/user`;
    navigate(path, { state: { id: user.id } });
  };
  return (
    <div
      onClick={routeChange}
      className='md:w-1/2 lg:w-1/3 flex items-center py-10 px-5 font-medium whitespace-nowrap hover:text-indigo-800 text-white hover:bg-gray-300 cursor-pointer rounded-xl'>
      <img
        className='w-20 h-20 rounded-full'
        crossOrigin='anonymous'
        src={user.profilePicture}
      />
      <div className='pl-3'>
        <div className='text-base font-bold'>{user.login}</div>
        <div className='text-base font-bold'>{user.fullName}</div>
        <div className='font-normal'>{user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
