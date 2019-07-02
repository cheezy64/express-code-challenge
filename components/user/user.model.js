const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const { model, Schema } = mongoose;
const { ObjectId } = Schema;

// TODO index by email for logging in
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'academic', 'administrator'],
    default: 'student',
  },
  password: {
    type: String,
    required: true,
    // TODO min max length validator
  },
  institution: {
    type: ObjectId,
    required: true,
    ref: 'Institution',
  },
},
{
  timestamps: true,
});

UserSchema.pre('save', async function saltAndHashPassword() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.plugin(uniqueValidator);

module.exports = model('User', UserSchema);
