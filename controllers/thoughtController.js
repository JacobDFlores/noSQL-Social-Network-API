const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const courses = await Thought.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const course = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!course) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {

      const course = await Thought.create(req.body);

      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: course._id } }, { new: true });


      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const course = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!course) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts:  req.params.thoughtId  } },
        { runValidators: true, new: true }
      );

      // await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const course = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
