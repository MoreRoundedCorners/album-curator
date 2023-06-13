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

const Playlist = sequelize.define(
  "Playlist",
  {
    // Model attributes are defined here
    playlist_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

Playlist.sync({ alter: true }); // Synchronizing the model with the database
module.exports = Playlist;
