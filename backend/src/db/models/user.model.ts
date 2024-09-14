import mongoose, { Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IUser {
  _id?: string;
  fullName: string;
  userEmail: string;
  password: string;
  gender: 'male' | 'female';
  profilePic: string;
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

// Create the Mongoose model.
const User = mongoose.model('User', userSchema);

export default User;
