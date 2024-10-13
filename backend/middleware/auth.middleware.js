import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  console.log("hell1");
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("hell2");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
  console.log("hell3");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Assuming you are using JWT
    console.log(decoded);
    req.user = { id: decoded.id }; // Ensure the user object contains 'id' and not '_id'
    next();
    console.log("hell4");
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const refreshAccessTokenIfNeeded = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ message: "Refresh Token is missing" });

      try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2h" }
        );

        req.cookies("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: strict,
          secure: process.env.NODE_ENV === "production",
          maxAge: 2 * 60 * 60 * 1000,
        });

        req.user = user;
        return next();
      } catch (error) {
        return res
          .status(403)
          .json({ message: "Refresh Token is Expired or Invalid" });
      }
    } else {
      return res.status(403).json({ message: "Token is invalid" });
    }
  }
};
