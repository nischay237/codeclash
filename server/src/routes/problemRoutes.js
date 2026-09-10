import express from 'express';
import { inMemoryStore } from '../services/store.js';

const router = express.Router();

// List all problems (excluding solution code & hidden test cases for security)
router.get('/', (req, res) => {
  const safeProblems = inMemoryStore.problems.map(p => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    difficulty: p.difficulty,
    category: p.category,
    description: p.description,
    starterCode: p.starterCode,
    examples: p.examples,
    constraints: p.constraints,
    publicTestCasesCount: p.testCases.filter(tc => !tc.isHidden).length,
    totalTestCasesCount: p.testCases.length
  }));

  res.json({ success: true, count: safeProblems.length, problems: safeProblems });
});

// Get single problem by slug
router.get('/:slug', (req, res) => {
  const problem = inMemoryStore.problems.find(p => p.slug === req.params.slug);
  if (!problem) return res.status(404).json({ error: 'Problem not found' });

  res.json({
    success: true,
    problem: {
      ...problem,
      solutionCode: undefined, // never leak solution
      testCases: problem.testCases.filter(tc => !tc.isHidden)
    }
  });
});

export default router;
