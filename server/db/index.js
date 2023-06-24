const conn = require('./conn');
const Todo = require('./Todo');



const syncAndSeed = async () => {
  await conn.sync({ force: true });

  await Todo.create({
    taskName: 'Buy Groceries',
    assignee: 'Maya',
    status: 'In progress',
    dueDate: new Date('2023-03-31'),
    description: 'Need to buy groceries for next ten days',
  });

  await Todo.create({
    taskName: 'Take over world',
    assignee: 'Maya',
    status: 'Pending',
    dueDate: new Date('2023-04-15'),
    description: 'Develop a master plan to conquer the world',
  });

  console.log(`
    Seeding successful!
  `);
};

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Todo,

  },
};
