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

const Playlist_songs = sequelize.define(
  "Playlist_songs",
  {
    // Model attributes are defined here
    playlist_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

Playlist_songs.sync({ alter: true }); // Synchronizing the model with the database
module.exports = Playlist_songs;
