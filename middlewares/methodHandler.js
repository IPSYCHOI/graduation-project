exports.methodH = (expectedMethod) => {
  return (req, res, next) => {
    if (req.method !== expectedMethod) {
      return res.status(405).json({
        message: `${req.method} not allowed on ${req.originalUrl}. Only ${expectedMethod} is allowed.`,
      });
    }
    next();
  };
};