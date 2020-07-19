// Create playlists table with association to songs table

module.exports = function(sequelize, DataTypes) {
  const Playlist = sequelize.define("Playlist", {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    pilot: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    copilot: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Playlist.associate = function(models) {
    Playlist.hasMany(models.Song, {
      onDelete: "CASCADE",
    });
  };
  return Playlist;
};
