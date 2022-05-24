module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    validated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    bearer_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    validation_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return User;
};
