const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('Todo', {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assignee: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Todo;
