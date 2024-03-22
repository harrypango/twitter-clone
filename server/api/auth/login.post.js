import { getUserByUsername } from "../../db/users.js";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt.js";
import { createRefreshToken } from "~/server/db/refreshTokens.js";
import { userTransformer } from "~/server/transformers/user.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // Is the user registered?
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Save it inside database
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
