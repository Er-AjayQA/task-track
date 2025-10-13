module.exports = (sequelize, Sequelize) => {
  const um_user_master = sequelize.define(
    "UM_USER_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("lastName", value === "" ? null : value);
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("email", value === "" ? null : value);
        },
      },
      mobilePrefix: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("mobilePrefix", value === "" ? null : value);
        },
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("mobileNumber", value === "" ? null : value);
        },
      },
      user_bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("user_bio", value === "" ? null : value);
        },
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("otp", value === "" ? null : value);
        },
      },
      otpExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("otpExpiry", value === "" ? null : value);
        },
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("profilePicture", value === "" ? null : value);
        },
      },
      isMobileVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("last_login", value === "" ? null : value);
        },
      },
      agreed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    { freezeTableName: true }
  );
  return um_user_master;
};
