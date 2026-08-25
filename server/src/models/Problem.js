import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: {
    type: Array,
    required: true
  },
  expectedOutput: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  functionName: {
    type: String,
    required: true
  },
  starterCode: {
    type: String,
    required: true
  },
  solutionCode: {
    type: String,
    required: true
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: [String],
  testCases: [testCaseSchema],
  timeLimitMs: {
    type: Number,
    default: 1500
  }
}, { timestamps: true });

export const Problem = mongoose.model('Problem', problemSchema);
