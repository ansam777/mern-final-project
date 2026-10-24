import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  coverImage: { type: String, default: 'https://via.placeholder.com/400x200?text=StoryLoop+Series' }
}, { timestamps: true });

export default mongoose.model('Series', seriesSchema);