const { User, Thought } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'Cannot find a user with that id' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      if (!user) {
        res.status(404).json({ messge: 'Cannot find a user with that id' });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'Deleted user and all of their thoughts' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
      if (!user) {
        res.status(404).json({ messge: 'Cannot find a user with that id' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
      if (!user) {
        res.status(404).json({ messge: 'Cannot find a user with that id' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
