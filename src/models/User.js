const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
      'Please fill a valid email address',
    ],
  },
  thoughts: [
    {
      type: Types.ObjectId,
      ref: 'Thought',
    },
  ],
  thoughts: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

UserSchema.virtual('friendCount').get(() => {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
