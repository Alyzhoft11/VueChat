import mongoose, { Document } from 'mongoose';

declare interface User extends Document {
  userName: string;
}

const userSchema = new mongoose.Schema({
  userName: String,
});

export default mongoose.model<any>('User', userSchema);
