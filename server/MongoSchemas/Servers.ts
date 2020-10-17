import mongoose, { Document } from 'mongoose';

interface Channels {
  channelName: string;
}

declare interface Servers extends Document {
  serverName: string;
  imageURL: string;
  ownerId: string;
  channels: [Channels];
}

const ServersSchema = new mongoose.Schema({
  serverName: {
    type: String,
    unique: true
  },
  imageURL: String,
  ownerId: String,
  channels: {
    type: Array,
    default: [{channelName: "General"}]
  }
});

export default mongoose.model<any>('Servers', ServersSchema);
