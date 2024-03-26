const mongoose = require('mongoose');
const User = require('../models/User.js');
const Thought = require('../models/Thought.js');

mongoose.connect('mongodb://127.0.0.1:27017/socialApiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDB = async () => {
  try {
    // delete everything
    await User.deleteMany();
    await Thought.deleteMany();
    // make users
    const users = await User.create([
      { username: 'brian', email: 'brian@aol.com' },
      { username: 'tico', email: 'tico@aol.com' },
    ]);
    // make my two users friends with eachother
    await User.findByIdAndUpdate(users[0], { $push: { friends: users[1]._id } });
    await User.findByIdAndUpdate(users[1], { $push: { friends: users[0]._id } });
    // make thoughts
    const thoughts = await Thought.create([
      {
        thoughtText: 'Brian is thinking',
        username: 'brian',
        reactions: [{ reactionBody: 'Tico reacted!', username: 'tico' }],
        userId: users[0]._id,
      },
      {
        thoughtText: 'Tico is thinking',
        username: 'tico',
        reactions: [{ reactionBody: 'Brian reacted!', username: 'brian' }],
        userId: users[0]._id,
      },
    ]);
    // adding thoughts
    await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
    await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });
    // done
    console.log('Successfully seeded DB');
    process.exit(0);
  } catch (error) {
    console.error('Could not seed database: ', error);
    process.exit(1);
  }
};

seedDB();
