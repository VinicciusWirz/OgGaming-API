import { followReq, isFollowing, unfollowReq } from "../repositories/users.repository.js";

async function followHandle(userId, targetId) {
  try {
    const { rows } = await isFollowing(userId, targetId);
    if (rows[0].follows) {
      await unfollowReq(userId, targetId);
    } else {
      await followReq(userId, targetId);
    }
    return {is_following: !rows[0].follows};
  } catch (error) {
    return error.message;
  }
}

const usersService = { followHandle };
export default usersService;