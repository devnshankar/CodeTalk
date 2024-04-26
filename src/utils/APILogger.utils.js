export const apiLogger = (req, res, next) => {
  try {
    console.log("API METHOD: " + JSON.stringify(req.method, null, 2));
    console.log("REQUEST BODY" + JSON.stringify(req.body, null, 2));
    console.log("REQUEST PARAMS" + JSON.stringify(req.params, null, 2));

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Logger Failed",
    });
  }
};
