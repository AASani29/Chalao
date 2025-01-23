export const verifyAdmin = (req, res, next) => {
  console.log('Admin Check: User Role:', req.user.role); // Debug log
  if (req.user.role !== 'admin') {
    console.error('Access denied: User is not admin'); // Debug log
    return res.status(403).json({ success: false, message: 'Access denied. Admins only!' });
  }
  next();
};
