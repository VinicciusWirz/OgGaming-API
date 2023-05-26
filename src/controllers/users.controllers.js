import usersService from "../services/usersService.js";

export async function followUser(req, res) {
  const userId = res.locals.userId;
  const targetId = res.locals.visitorUserId;
  try {
    const result = await usersService.followHandle(userId, targetId);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getFollowerList(req, res) {
  const userId = res.locals.userId;
  try {
    const result = await usersService.fetchFollowerList(userId);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
