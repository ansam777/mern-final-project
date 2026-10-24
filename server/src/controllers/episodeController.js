import Episode from '../models/Episode.js';
import Series from '../models/Series.js';

export const createEpisode = async (req, res, next) => {
  try {
    const { seriesId, title, content, episodeNumber, readTime } = req.body;
    if (!seriesId || !title || !content || !episodeNumber) {
      res.status(400);
      throw new Error('Missing required episode details.');
    }

    const series = await Series.findById(seriesId);
    if (!series) {
      res.status(404);
      throw new Error('Associated series not found.');
    }

    if (series.authorId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Unauthorized to add episodes to this series.');
    }

    const episode = new Episode({
      seriesId,
      title,
      content,
      episodeNumber: Number(episodeNumber),
      readTime: Number(readTime) || 3
    });

    await episode.save();
    res.status(201).json(episode);
  } catch (error) {
    next(error);
  }
};

export const getEpisodeById = async (req, res, next) => {
  try {
    const episode = await Episode.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!episode) {
      res.status(404);
      throw new Error('Episode not found.');
    }

    const allEpisodes = await Episode.find({ seriesId: episode.seriesId }).sort({ episodeNumber: 1 });
    const currentIndex = allEpisodes.findIndex(e => e._id.toString() === episode._id.toString());

    const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1]._id : null;
    const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1]._id : null;

    res.json({ episode, prevEpisode, nextEpisode });
  } catch (error) {
    next(error);
  }
};