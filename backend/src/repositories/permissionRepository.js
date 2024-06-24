const Permission = require('../../entities/permission');

module.exports = class PermissionRepository {
    constructor() { }

    async createPermission(permissionData) {
        const permission = new Permission(permissionData);
        return await permission.save();
    }

    async getPermission(userId) {
        return await Permission.findOne({ userId });
    }

    async updatePermission(id, updateData) {
        return await Permission.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deletePermission(id) {
        return await Permission.findByIdAndDelete(id);
    }

    async listPermissions(userId) {
        return await Permission.find({ userId });
    }
};
