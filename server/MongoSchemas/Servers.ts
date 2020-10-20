import mongoose, { Document } from 'mongoose';

interface Channels {
  channelName: string;
}

interface Messages {
  userName: string
  userId: string
  text: string
  date: string
  time: string
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
    default: [{
        channelName: "General",
        messages: []
      }]
  }
});

export default mongoose.model<any>('Servers', ServersSchema);
