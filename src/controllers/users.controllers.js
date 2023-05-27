import usersService from "../services/usersService.js";

export async function followUser(req, res) {
  const userId = res.locals.userId;
  const targetId = res.locals.visitorUserId;
  try {
    const result = await usersService.followHandle(userId, targetId);
    if (result.error) {
      return res.status(result.error.status).send(result.error.message);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getFollowerList(req, res) {
  const userId = res.locals.userId;
  try {
    const result = await usersService.fetchFollowerList(userId);
    if (result.error) {
      return res.status(result.error.status).send(result.error.message);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getFollowingList(req, res) {
  const userId = res.locals.userId;
  try {
    const result = await usersService.fetchFollowingList(userId);
    if (result.error) {
      return res.status(result.error.status).send(result.error.message);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getSearchQuery(req, res) {
  const userId = res.locals.userId;
  const name = req.params.name;
  try {
    const result = await usersService.fetchUserQuery(userId, name);
    if (result.error) {
      return res.status(result.error.status).send(result.error.message);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function editUserInfo(req, res) {
  const userId = res.locals.userId;
  const body = req.body;
  try {
    const result = await usersService.editUser(userId, body);
    if (result.error) {
      return res.status(result.error.status).send(result.error.message);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
