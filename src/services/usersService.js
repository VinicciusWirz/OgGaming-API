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
    return { error: { status: 500, message: error.message } };
  }
}

async function fetchFollowerList(userId) {
  try {
    const { rows } = await findFollowers(userId);
    return rows;
  } catch (error) {
    return { error: { status: 500, message: error.message } };
  }
}

async function fetchFollowingList(userId) {
  try {
    const { rows } = await findFollowing(userId);
    return rows;
  } catch (error) {
    return { error: { status: 500, message: error.message } };
  }
}

async function fetchUserQuery(userId, name) {
  findNameQuery(userId, name);
  try {
    const { rows } = await findNameQuery(userId, name);
    return rows;
  } catch (error) {
    return { error: { status: 500, message: error.message } };
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
    if (error.constraint === "users_username_key") {
      return { error: { status: 409, message: "username is taken" } };
    }
    if (error.constraint === "users_email_key") {
      return { error: { status: 409, message: "email is in use" } };
    }
    if (error.constraint === "images_image_url_key") {
      return { error: { status: 400, message: "image need to be valid url" } };
    }
    if (error.constraint === "images_user_id_key") {
      return {
        error: { status: 401, message: "image needs to pair with valid user" },
      };
    }
    return { error: { status: 500, message: error.message } };
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
