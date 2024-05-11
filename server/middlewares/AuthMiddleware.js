import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token;

    // Check if JWT token is in cookies
    if (req.cookies.jwt) {
      const tokenObject = JSON.parse(req.cookies.jwt);
      token = tokenObject.jwt;
    }

    // If JWT token is not in cookies, check the Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const [, tokenFromHeader] = authHeader.split(" ");

      if (tokenFromHeader) {
        token = tokenFromHeader;
      }
    }

    // If token is still not found, return 401 Unauthorized
    if (!token) {
      return res.status(401).send("You are not authenticated!");
    }

    // Verify the token
    const authKey = process.env.JWT_KEY;
    const payload = await jwt.verify(token, authKey);
    console.log("Payload:", payload);

    // Attach userId to the request object
    req.userId = payload?.userId;
    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(403).send("Token is not valid!");
  }
};
