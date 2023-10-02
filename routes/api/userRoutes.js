const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/useres/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
