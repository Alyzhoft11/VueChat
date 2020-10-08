import mongoose, { Document } from 'mongoose';

declare interface Messages extends Document {
  text: string;
  userId: string;
}

const MessagesSchema = new mongoose.Schema({
  text: String,
  userId: String,
});

export default mongoose.model<any>('Messages', MessagesSchema);
