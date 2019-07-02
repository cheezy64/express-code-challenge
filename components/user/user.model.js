const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

// TODO index by email for logging in
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // TODO FIXME "unique" attribute is not a good way to check for duplicates.  Add more robust validation
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

//// Password Handling
UserSchema.methods.comparePassword = async function comparePassword(unhashedPassword) {
  const isMatch = await bcrypt.compare(unhashedPassword, this.password);
  if (!isMatch) throw new Error('Email and/or password does not match records');
};

UserSchema.pre('save', async function saltAndHashPassword() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.plugin(uniqueValidator);

module.exports = model('User', UserSchema);
