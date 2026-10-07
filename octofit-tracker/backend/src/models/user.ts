import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    fitnessGoal: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
