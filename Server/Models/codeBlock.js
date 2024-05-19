const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const CodeBlock = sequelize.define(
  "CodeBlock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false, // This will enable automatic management of createdAt and updatedAt columns
    underscored: false, // Use snake_case for column names
  }
);

module.exports = CodeBlock;
