import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  try {
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
        bio: 'Weekend runner training for a half marathon.',
        fitnessGoal: 'Run a half marathon',
      },
      {
        username: 'sam_strength',
        email: 'sam@example.com',
        displayName: 'Sam Chen',
        bio: 'Strength training and mobility enthusiast.',
        fitnessGoal: 'Build full-body strength',
      },
      {
        username: 'jordan_yoga',
        email: 'jordan@example.com',
        displayName: 'Jordan Patel',
        bio: 'Finding balance through yoga and cycling.',
        fitnessGoal: 'Improve flexibility and consistency',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team for runners who love the outdoors.',
        members: [users[0]._id, users[2]._id],
        totalPoints: 420,
      },
      {
        name: 'Power Squad',
        description: 'Building strength one session at a time.',
        members: [users[1]._id],
        totalPoints: 315,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        activityType: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 390,
        distanceKilometers: 7.2,
        completedAt: new Date('2026-10-05T08:00:00.000Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        activityType: 'Strength training',
        durationMinutes: 50,
        caloriesBurned: 280,
        completedAt: new Date('2026-10-05T17:30:00.000Z'),
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        activityType: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 150,
        completedAt: new Date('2026-10-06T07:15:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 240, activitiesCompleted: 12, period: '2026-10' },
      { user: users[1]._id, team: teams[1]._id, points: 210, activitiesCompleted: 9, period: '2026-10' },
      { user: users[2]._id, team: teams[0]._id, points: 180, activitiesCompleted: 10, period: '2026-10' },
    ]);

    await Workout.insertMany([
      {
        title: 'Steady State Run',
        category: 'Cardio',
        description: 'A conversational-pace run to build aerobic endurance.',
        durationMinutes: 40,
        difficulty: 'beginner',
        target: 'Cardiovascular endurance',
        equipment: ['Running shoes'],
        recommendedFor: users[0]._id,
      },
      {
        title: 'Full-Body Strength',
        category: 'Strength',
        description: 'A balanced circuit of compound movements and core work.',
        durationMinutes: 45,
        difficulty: 'intermediate',
        target: 'Full-body strength',
        equipment: ['Dumbbells', 'Mat'],
        recommendedFor: users[1]._id,
      },
      {
        title: 'Mobility Flow',
        category: 'Flexibility',
        description: 'A gentle sequence focused on hips, shoulders, and balance.',
        durationMinutes: 25,
        difficulty: 'beginner',
        target: 'Mobility and flexibility',
        equipment: ['Mat'],
        recommendedFor: users[2]._id,
      },
    ]);

    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
