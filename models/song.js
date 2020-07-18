// Create individual Song rows with Spotify track ID information to easily
// speak with the Spotify API

module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("Song", {
    artist: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    trackId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    pilot_rating: {
      type: DataTypes.INTEGER(1),
      default: null,
      validate: {
        max: 5,
        min: 1,
      },
    },
    copilot_rating: {
      type: DataTypes.INTEGER(1),
      default: null,
      validate: {
        max: 5,
        min: 1,
      },
    },
    avg_rating: {
      type: DataTypes.DECIMAL(2, 1),
      default: null,
      validate: {
        max: 5,
        min: 1,
      },
    },
  });

  Song.associate = function(models) {
    Song.belongsTo(models.Playlist, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Song;
};
