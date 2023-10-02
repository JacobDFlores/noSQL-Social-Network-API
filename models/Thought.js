const { Schema, model } = require('mongoose');

// Schema to create a course model
const courseSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,

      // Need to add getter to format time

    },
    id: false,
  }
);

const Course = model('course', courseSchema);

module.exports = Course;
