export const INITIAL_PROBLEMS = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays & Hash Table",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    functionName: "twoSum",
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] == 6, so return [1, 2]." }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], isHidden: false },
      { input: [[3, 2, 4], 6], expectedOutput: [1, 2], isHidden: false },
      { input: [[3, 3], 6], expectedOutput: [0, 1], isHidden: false },
      { input: [[1, 5, 8, 12, 19], 20], expectedOutput: [0, 4], isHidden: true },
      { input: [[-3, 4, 3, 90], 0], expectedOutput: [0, 2], isHidden: true }
    ]
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "Easy",
    category: "Strings",
    description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    functionName: "isAnagram",
    starterCode: `function isAnagram(s, t) {
  // Write your code here
  
}`,
    solutionCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const char of s) count[char] = (count[char] || 0) + 1;
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true", explanation: "All letters match in both words." },
      { input: "s = \"rat\", t = \"car\"", output: "false", explanation: "Letters do not match." }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    testCases: [
      { input: ["anagram", "nagaram"], expectedOutput: true, isHidden: false },
      { input: ["rat", "car"], expectedOutput: false, isHidden: false },
      { input: ["a", "a"], expectedOutput: true, isHidden: false },
      { input: ["ab", "a"], expectedOutput: false, isHidden: true },
      { input: ["listen", "silent"], expectedOutput: true, isHidden: true }
    ]
  },
  {
    title: "Maximum Subarray (Kadane's)",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    functionName: "maxSubArray",
    starterCode: `function maxSubArray(nums) {
  // Write your code here
  
}`,
    solutionCode: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "Single element." },
      { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "Subarray [5,4,-1,7,8] has sum 23." }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expectedOutput: 6, isHidden: false },
      { input: [[1]], expectedOutput: 1, isHidden: false },
      { input: [[5, 4, -1, 7, 8]], expectedOutput: 23, isHidden: false },
      { input: [[-1, -2, -3, -4]], expectedOutput: -1, isHidden: true },
      { input: [[100, -50, 200, -10]], expectedOutput: 250, isHidden: true }
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Arrays & Greedy",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    functionName: "maxProfit",
    starterCode: `function maxProfit(prices) {
  // Write your code here
  
}`,
    solutionCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and max profit = 0." }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expectedOutput: 5, isHidden: false },
      { input: [[7, 6, 4, 3, 1]], expectedOutput: 0, isHidden: false },
      { input: [[2, 4, 1]], expectedOutput: 2, isHidden: true },
      { input: [[1, 2]], expectedOutput: 1, isHidden: true }
    ]
  },
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    functionName: "isPalindrome",
    starterCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
    solutionCode: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    examples: [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true", explanation: "\"amanaplanacanalpanama\" is a palindrome." },
      { input: "s = \"race a car\"", output: "false", explanation: "\"raceacar\" is not a palindrome." }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expectedOutput: true, isHidden: false },
      { input: ["race a car"], expectedOutput: false, isHidden: false },
      { input: [" "], expectedOutput: true, isHidden: false },
      { input: ["0P"], expectedOutput: false, isHidden: true },
      { input: ["ab_a"], expectedOutput: true, isHidden: true }
    ]
  }
];
