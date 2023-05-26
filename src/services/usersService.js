import {
  findFollowers,
  findFollowing,
  findNameQuery,
  followReq,
  isFollowing,
  unfollowReq,
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

const usersService = {
  followHandle,
  fetchFollowerList,
  fetchFollowingList,
  fetchUserQuery,
};
export default usersService;
