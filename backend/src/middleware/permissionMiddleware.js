const PermissionService = require('../services/permissionService');

module.exports = class PermissionMiddleware {
    constructor() {
        this.permissionService = new PermissionService();
    }

    checkPermission(action) {
        const permissionService = this.permissionService;
        return async (req, res, next) => {
            const userId = req.userData.userId;
            try {
                const permission = await permissionService.getPermission(userId);
                console.log("permission checkPermission", permission);
                if (permission && permission[action]) {
                    next();
                } else {
                    res.status(403).json({ message: 'Forbidden' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        };
    }
};



