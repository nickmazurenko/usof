import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => { navigate(`/posts/category/${category.id}`); }} className='rounded-2xl border bg-indigo-500 px-3 py-1 text-xs font-semibold'>
      {category.categoryTitle}
    </button>
  );
};

export default Category;
