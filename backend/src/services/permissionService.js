const PermissionRepository = require('../repositories/permissionRepository');
const permissionRepository = new PermissionRepository();
const redisClient = require('../../config/redisClient');

const PERMISSION_CACHE_PREFIX = 'permissions:';
const CACHE_EXPIRATION = 3600;

const cachePermissions = async (permission) => {
    const key = `${PERMISSION_CACHE_PREFIX}${permission.userId}`;
    await redisClient.set(key, JSON.stringify(permission), 'EX', CACHE_EXPIRATION);
};

const getPermissionsFromCache = async (userId) => {
    const key = `${PERMISSION_CACHE_PREFIX}${userId}`;
    const cachedPermissions = await redisClient.get(key);
    return cachedPermissions ? JSON.parse(cachedPermissions) : null;
};

module.exports = class PermissionService {
    async createPermission(permissionData) {
        try {
            const permission = await permissionRepository.createPermission(permissionData);
            await cachePermissions(permission);
            return permission;
        } catch (err) {
            throw err;
        }
    };

    async getPermission(userId) {
        try {
            const cachedPermissions = await getPermissionsFromCache(userId);
            if (cachedPermissions) {
                return cachedPermissions;
            }

            const permission = await permissionRepository.getPermission(userId);
            if (permission) {
                await cachePermissions(permission);
                console.log("Permissions cached successfully");
            }
            return permission;
        } catch (err) {
            console.error("Error fetching permissions: ", err);
            throw err;
        }
    };

    async updatePermission(id, updateData) {
        try {
            const permission = await permissionRepository.updatePermission(id, updateData);
            if (permission) {
                await cachePermissions(permission);
                console.log("Permissions updated and cached successfully");
            }
            return permission;
        } catch (err) {
            throw err;
        }
    };

    async deletePermission(id) {
        try {
            const permission = await permissionRepository.deletePermission(id);
            if (permission) {
                const key = `${PERMISSION_CACHE_PREFIX}${permission.userId}`;
                await redisClient.del(key);
                console.log("Permissions deleted from cache successfully");
            }
            return permission;
        } catch (err) {
            throw err;
        }
    };

    async listPermissions(userId) {
        try {
            return await permissionRepository.listPermissions(userId);
        } catch (err) {
            throw err;
        }
    };

}

