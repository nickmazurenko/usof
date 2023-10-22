const UserPopOver = ({ user }) => {
  return (
    <>
      <div className='inline-block absolute z-10 w-70 -top-6 -left-10 text-sm font-light rounded-lg border  shadow-sm text-gray-400 bg-gray-800 border-gray-600'>
        <div className='p-3'>
          <div className='flex justify-between items-center mb-2'>
            <img
              className='w-10 h-10 rounded-full'
              crossOrigin='anonymous'
              src={user.profilePicture}
            />
          </div>
          <p className='text-base font-semibold leading-none text-gray-900 dark:text-white'>
            {user.fullName}
          </p>
          <p className='mb-3 text-sm font-normal'>@{user.login}</p>
          <ul className='flex flex-col lg:flex-row text-sm font-light'>
            <li className='flex flex-row mr-2 space-x-2'>
              <span className='font-semibold text-gray-900 dark:text-white'>
                {user.postsCount}
              </span>
              <span> Posts </span>
            </li>
            <li className='flex flex-row mr-2 space-x-2'>
              <span className='font-semibold text-gray-900 dark:text-white'>
                {user.rating}
              </span>
              <span> Rating </span>
            </li>
            <li className='flex flex-row mr-2 space-x-2'>
              <span className='font-semibold text-gray-900 dark:text-white'>
                {user.views}
              </span>
              <span> Views </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserPopOver;
