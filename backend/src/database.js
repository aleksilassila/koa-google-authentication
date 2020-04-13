const Sequelize = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.DB_URL, {
    logging: false,
});

const User = (exports.User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    googleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}));

const Post = (exports.Post = sequelize.define("post", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
    },
}));

Post.belongsTo(User);

exports.sync = (options) => sequelize.sync(options);
