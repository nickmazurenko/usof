import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategories } from '../features/categories/actions';
import CategoriesTable from '../components/categoriesPage/CategoriesTable';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, categories } = useSelector((storeState) => {
    return storeState.categories;
  });
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <CategoriesTable
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default CategoriesPage;
