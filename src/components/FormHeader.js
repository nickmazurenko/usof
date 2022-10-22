import { Link } from 'react-router-dom';

const Header = ({
  heading, paragraph, linkName, linkUrl = '#'
}) => {
  return (
  <div className='mb-10'>
      <div className='flex justify-center'>
        <img
          alt=''
          className='h-20'
          src='https://ik.imagekit.io/g39hqj8mc/logo_1__bJtQz4Zyp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666396394021'
        />
      </div>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
        {heading}
      </h2>
      <p className='mt-2 text-center text-sm text-white mt-5'>
        {paragraph}{' '}
        <Link
          to={linkUrl}
          className='font-medium text-pink-500 hover:text-pink-400'>
          {linkName}
        </Link>
      </p>
    </div>
  );
};
export default Header;
