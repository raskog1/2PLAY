// Copilot and Playlist columns allow us to do everything in one database

module.exports = function (sequelize, DataTypes) {
  const Songs = sequelize.define("Songs", {
    artist: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    copilot: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    playlist: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    trackId: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    user_rating: {
      type: DataTypes.INTEGER(1),
      validate: {
        max: 5,
        min: 1
      }
    },
    copilot_rating: {
      type: DataTypes.INTEGER(1),
      validate: {
        max: 5,
        min: 1
      }
    },
    avg_rating: {
      type: DataTypes.DECIMAL(3, 2),
      validate: {
        max: 5,
        min: 1
      }
    },
  });
  return Songs;
};
