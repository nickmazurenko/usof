import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
  return (
    <a href={`/posts/category/${category.id}`}>
      <button className='rounded-2xl border bg-indigo-500 px-3 py-1 text-xs font-semibold'>
        {category.categoryTitle}
      </button>
    </a>
  );
};

export default Category;
