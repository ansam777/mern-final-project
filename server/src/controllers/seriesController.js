import Series from '../models/Series.js';
import Episode from '../models/Episode.js';

export const getAllSeries = async (req, res, next) => {
  try {
    const seriesList = await Series.find().populate('authorId', 'name').sort({ createdAt: -1 });
    res.json(seriesList);
  } catch (error) {
    next(error);
  }
};

export const getMySeries = async (req, res, next) => {
  try {
    const mySeries = await Series.find({ authorId: req.user.id }).sort({ createdAt: -1 });
    res.json(mySeries);
  } catch (error) {
    next(error);
  }
};

export const createSeries = async (req, res, next) => {
  try {
    const { title, description, genre, coverImage } = req.body;
    if (!title || !description || !genre) {
      res.status(400);
      throw new Error('Title, description, and genre are required.');
    }

    const newSeries = new Series({
      authorId: req.user.id,
      title,
      description,
      genre,
      coverImage: coverImage || undefined
    });

    await newSeries.save();
    res.status(201).json(newSeries);
  } catch (error) {
    next(error);
  }
};

export const getSeriesById = async (req, res, next) => {
  try {
    const series = await Series.findById(req.params.id).populate('authorId', 'name bio');
    if (!series) {
      res.status(404);
      throw new Error('Series not found.');
    }

    const episodes = await Episode.find({ seriesId: req.params.id }).sort({ episodeNumber: 1 });
    res.json({ series, episodes });
  } catch (error) {
    next(error);
  }
};