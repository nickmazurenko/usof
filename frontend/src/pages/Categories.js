import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../features/categories/actions';
import CategoriesTable from '../components/categoriesPage/CategoriesTable';
import CardLoader from '../components/CardLoader';

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const { loading, categories } = useSelector((storeState) => {
    return storeState.categories;
  });
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <>
      {loading ? (
        <CardLoader />
      ) : (
        <div>
          <CategoriesTable categories={categories} loading={loading} />
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
