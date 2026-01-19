import AppError from '../utils/appError.js'

// Verify Role
export const checkRole = (allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user || !req.user.role) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
      return next(new AppError("Server error: roles not configured", 500));
    }
    const userRole = req.user.role;

    // Check if role allowed
    if (!allowedRoles.includes(userRole)) {
      return next(
        new AppError(
          `Access denied. '${userRole}' is not allowed to access this route.`,
          403
        )
      );
    }
    next();
  };
};
