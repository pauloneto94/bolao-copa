const User = require('../models/User')

const adminMiddleware = async (req, res, next) => {
    
    const isAdmin = await User.findOne({
        where: { id: req.userId, isAdmin: true },
      });
    
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      next();
}

module.exports = {
    adminMiddleware
}