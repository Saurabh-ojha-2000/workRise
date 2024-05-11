// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   try {
//     const tokenObject = JSON.parse(req.cookies.jwt);
//     const token = tokenObject.jwt;
//     console.log("Token:", token);
    
//     const authKey = process.env.JWT_KEY;
//     console.log("Key:", authKey);

//     if (!token) {
//       return res.status(401).send("You are not authenticated!");
//     }

//     const payload = await jwt.verify(token, authKey);
//     console.log("Payload:", payload);
    
//     req.userId = payload?.userId;
//     next();
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(403).send("Token is not valid!");
//   }
// };

import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).send("You are not authenticated!");
    }

    const tokenObject = JSON.parse(req.cookies.jwt);
    const token = tokenObject.jwt;
    console.log("Token:", token);
    
    const authKey = process.env.JWT_KEY;
    console.log("Key:", authKey);

    if (!token) {
      return res.status(401).send("You are not authenticated!");
    }

    const payload = await jwt.verify(token, authKey);
    console.log("Payload:", payload);
    
    req.userId = payload?.userId;
    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(403).send("Token is not valid!");
  }
};
