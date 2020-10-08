import mongoose, { Document } from 'mongoose';

declare interface User extends Document {
  userName: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

export default mongoose.model<any>('User', userSchema);
