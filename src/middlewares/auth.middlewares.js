import AuthService from "../services/auth.services.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    const verifiedToken = AuthService.verifyToken(token);

    if (!verifiedToken) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    } else {
      if (req.method === "POST" || req.method === "PUT") {
        req.body = { ...req.body, user_id: verifiedToken.id };
        next();
      } else if (req.method === "GET" || req.method === "DELETE") {
        req.params = { ...req.params, user_id: verifiedToken.id };
        next();
      }
    }
  } catch (error) {
    if (error.message === "invalid token") {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    } else {
      return res.staus(500).json({
        success: false,
        message: "Authentication Failed",
      });
    }
  }
};
