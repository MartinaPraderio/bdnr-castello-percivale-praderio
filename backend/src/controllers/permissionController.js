const PermissionService = require('../services/permissionService');

module.exports = class PermissionController {
    constructor() {
        this.permissionService = new PermissionService();
    }

    async createPermission(req, res) {
        try {
            const permission = await this.permissionService.createPermission(req.body);
            res.status(201).json(permission);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    async updatePermission(req, res) {
        try {
            const updatedPermission = await this.permissionService.updatePermission(req.params.id, req.body);
            res.json(updatedPermission);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    async deletePermission(req, res) {
        try {
            await this.permissionService.deletePermission(req.params.id);
            res.json({ message: 'Permission deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    async listPermissions(req, res) {
        try {
            const permissions = await this.permissionService.listPermissions(req.params.userId);
            res.json(permissions);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

}
