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

const Songs = sequelize.define(
  "Songs",
  {
    // Model attributes are defined here
    song_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feeling: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s3_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

Songs.sync({ alter: true }); // Synchronizing the model with the database
module.exports = Songs;
