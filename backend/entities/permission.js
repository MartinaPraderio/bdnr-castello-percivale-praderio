const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    canView: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);