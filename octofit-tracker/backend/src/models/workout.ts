import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    target: { type: String, required: true, trim: true },
    equipment: [{ type: String, trim: true }],
    recommendedFor: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
