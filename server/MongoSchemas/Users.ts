import mongoose, { Document } from 'mongoose';


declare interface User extends Document {
  userName: string;
  password: string;
  email: string;
  servers: Array<any>
}

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  servers: {
    type: Array,
    default: []
  }
});

export default mongoose.model<any>('User', userSchema);
