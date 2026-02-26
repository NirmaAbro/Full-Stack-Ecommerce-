// “Authentication checks who you are, authorization checks what you can do 

export const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Admin Access required !",
    });
  }
};
