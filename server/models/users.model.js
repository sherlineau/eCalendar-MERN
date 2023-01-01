const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      minLength: [2, 'First Name must be at least 2 characters'],
    },

    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      minLength: [2, 'Last Name must be at least 2 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: 'Please enter a valid email',
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
    },
  },
  { timestamps: true }
);

// virtual field is used for validation -> not going to be saved into database
// 'confirmPassword' <- has to be the EXACT same in front-end form or postman req.body
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// before (pre) saving user to database, validate password matches confirm password -> if they do not match .invalidate() creates a validation error message
UserSchema.pre('validate', function (next) {
  if (this.password !== this.get('confirmPassword')) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// before saving user to db -> encrypt the input password after all other validations have been passed
UserSchema.pre('save', function (next) {
  // 10 represents the number of rounds we are going to hash the password before saving
  bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    });
});

module.exports.User = mongoose.model('User', UserSchema);