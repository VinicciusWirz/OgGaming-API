import {
  findFollowers,
  findFollowing,
  findNameQuery,
  followReq,
  isFollowing,
  unfollowReq,
  updateUserDB,
  updateUserPicDB,
} from "../repositories/users.repository.js";

async function followHandle(userId, targetId) {
  try {
    const { rows } = await isFollowing(userId, targetId);
    if (rows[0].follows) {
      await unfollowReq(userId, targetId);
    } else {
      await followReq(userId, targetId);
    }
    return { is_following: !rows[0].follows };
  } catch (error) {
    return error.message;
  }
}

async function fetchFollowerList(userId) {
  try {
    const { rows } = await findFollowers(userId);
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function fetchFollowingList(userId) {
  try {
    const { rows } = await findFollowing(userId);
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function fetchUserQuery(userId, name) {
  findNameQuery(userId, name);
  try {
    const { rows } = await findNameQuery(userId, name);
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function editUser(userId, body) {
  const { image, name, username, bio, birthday, email } = body;
  const lowerUsername = username?.toLowerCase();
  try {
    if (image) {
      const result = await updateUserPicDB(image, userId);
      return result;
    } else {
      const result = await updateUserDB(
        name,
        lowerUsername,
        bio,
        birthday,
        email,
        userId
      );
      return result;
    }
  } catch (error) {
    return error.message;
  }
}

const usersService = {
  followHandle,
  fetchFollowerList,
  fetchFollowingList,
  fetchUserQuery,
  editUser,
};
export default usersService;
