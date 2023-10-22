const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Comments = db.define(
  'comments',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    db,
    tableName: 'comments',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
      {
        name: 'post_id',
        using: 'BTREE',
        allowNull: true,
        fields: [{ name: 'postId' }],
      },
      {
        name: 'comment_id',
        using: 'BTREE',
        fields: [{ name: 'comment_id' }],
      },
      {
        name: 'user_id',
        using: 'BTREE',
        fields: [{ name: 'user_id' }],
      },
    ],
  },
);

module.exports = Comments;
