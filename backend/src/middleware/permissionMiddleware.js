const PermissionService = require('../services/permissionService');
const UserService = require('../services/userService');

module.exports = class PermissionMiddleware {
    constructor() {
        this.userService = new UserService();
        this.permissionService = new PermissionService();
    }

    checkPermission(action) {
        return async (req, res, next) => {
            const userId = req.userData.userId;
            const profileToVisitId = req.params.id;

            try {
                if (userId === profileToVisitId) {
                    return next();
                }

                const profileToVisit = await this.userService.getUserProfile(profileToVisitId);
                if (!profileToVisitId) {
                    return res.status(404).json({ message: 'User not found' });
                }

                if (profileToVisit.privacySettings.visibility === 'public') {
                    return next();
                }
                const isFriend = profileToVisit.friends.includes(userId);
                if (isFriend) {
                    if (action === 'canView') {
                        return next();
                    }

                    if (action === 'canEdit') {
                        return res.status(403).json({ message: 'Forbidden' });
                    }
                }

                res.status(403).json({ message: 'Forbidden' });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        };
    }
};



