import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Word || mongoose.model('Word', wordSchema);
