import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  episodeNumber: { type: Number, required: true },
  readTime: { type: Number, default: 3 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Episode', episodeSchema);