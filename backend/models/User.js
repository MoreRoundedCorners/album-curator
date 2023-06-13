const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  "house-money",
  "root",
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    },
    resetPasswordLink: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

User.sync({ alter: true }); // Synchronizing the model with the database
module.exports = User;
