const { PostCategories } = require('../tables');

const createMultiple = async (postCategories) => await PostCategories.bulkCreate(postCategories).catch((error) => {
  console.log(error);
  throw new Error(
    'An error occurred during multiple post categories creation',
  );
});

const remove = async (post_id) => {
  await PostCategories.destroy({ where: { post_id } }).catch(
    (error) => {
      console.log(error);
      throw new Error(
        'An error occurred during multiple post categories removal',
      );
    },
  );
};

module.exports = {
  createMultiple,
  remove,
};
