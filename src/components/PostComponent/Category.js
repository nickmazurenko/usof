import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/posts', { state: { id: category.id } });
  };
  return (
    <button
      onClick={routeChange}
      className='rounded-2xl border bg-indigo-500 px-3 py-1 text-xs font-semibold'>
      Category
    </button>
  );
};

export default Category;
