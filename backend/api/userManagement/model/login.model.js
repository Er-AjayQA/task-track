module.exports = (sequelize, Sequelize) => {
  const um_login_history = sequelize.define(
    "UM_LOGIN_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UM_USER_MASTER",
          key: "id",
        },
      },
      loginType: {
        type: Sequelize.ENUM("email", "mobile", "username"),
        allowNull: false,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      deviceInfo: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      loginAttemptId: {
        type: Sequelize.STRING, // For tracking login sessions
        allowNull: true,
      },
      isSuccessful: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      failureReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      loginAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      logoutAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["loginAt"],
        },
      ],
    }
  );
  return um_login_history;
};
