import mongoose, { Document } from 'mongoose';

declare interface Servers extends Document {
  serverName: string;
  imageURL: string;
  ownerId: string

}

const ServersSchema = new mongoose.Schema({
  serverName: String,
  imageURL: String,
  ownerId: String
});

export default mongoose.model<any>('Servers', ServersSchema);
