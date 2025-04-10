const allowRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ msg: 'Access denied: insufficient permission' });
      }
      next();
    };
  };
  
  module.exports = allowRole;
  