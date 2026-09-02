import vm from 'node:vm';

/**
 * Deep equality checker for test assertions
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

/**
 * Executes user JavaScript code against a suite of test cases inside an isolated VM
 * @param {string} code - User written function code
 * @param {string} functionName - Function to call (e.g. 'twoSum')
 * @param {Array<{input: Array, expectedOutput: any, isHidden: boolean}>} testCases
 * @param {number} timeoutMs - Max execution time per test case (default: 1500ms)
 */
export async function executeInSandbox(code, functionName, testCases = [], timeoutMs = 1500) {
  const results = [];
  let passedCount = 0;
  let totalTimeMs = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const logs = [];

    // Sandbox context with captured console and safe globals
    const sandbox = {
      console: {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
        warn: (...args) => logs.push('[WARN] ' + args.join(' '))
      },
      Math,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Date,
      RegExp,
      Map,
      Set,
      JSON,
      parseInt,
      parseFloat,
      isNaN,
      isFinite
    };

    const context = vm.createContext(sandbox);

    const startTime = performance.now();
    let passed = false;
    let actualOutput = null;
    let error = null;

    try {
      // 1. Evaluate user code in sandbox
      const script = new vm.Script(code, { filename: 'solution.js' });
      script.runInContext(context, { timeout: timeoutMs });

      // 2. Ensure target function exists
      if (typeof sandbox[functionName] !== 'function') {
        throw new Error(`Function "${functionName}" is not defined. Please export or declare function ${functionName}(...).`);
      }

      // 3. Bind cloned input args into sandbox context
      sandbox.__inputArgs = JSON.parse(JSON.stringify(testCase.input));

      // 4. Execute the function call WITH timeout enforcement
      const execScript = new vm.Script(`__result = ${functionName}(...__inputArgs);`, { filename: 'call.js' });
      execScript.runInContext(context, { timeout: timeoutMs });
      actualOutput = sandbox.__result;

      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      totalTimeMs += elapsed;

      // 5. Compare result with expectedOutput
      passed = deepEqual(actualOutput, testCase.expectedOutput);
      if (passed) passedCount++;

      results.push({
        testIndex: i + 1,
        isHidden: testCase.isHidden || false,
        passed,
        input: testCase.isHidden ? '[HIDDEN]' : testCase.input,
        expectedOutput: testCase.isHidden ? '[HIDDEN]' : testCase.expectedOutput,
        actualOutput: testCase.isHidden && !passed ? '[HIDDEN_MISMATCH]' : actualOutput,
        executionTimeMs: elapsed,
        logs: logs.slice(0, 10),
        error: null
      });

    } catch (err) {
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      totalTimeMs += elapsed;

      let errorMsg = err.message || 'Execution error';
      if (err.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT' || err.message.includes('timed out')) {
        errorMsg = `Time Limit Exceeded (${timeoutMs}ms). Possible infinite loop or slow recursion.`;
      }

      results.push({
        testIndex: i + 1,
        isHidden: testCase.isHidden || false,
        passed: false,
        input: testCase.isHidden ? '[HIDDEN]' : testCase.input,
        expectedOutput: testCase.isHidden ? '[HIDDEN]' : testCase.expectedOutput,
        actualOutput: null,
        executionTimeMs: elapsed,
        logs,
        error: errorMsg
      });
    }
  }

  const allPassed = passedCount === testCases.length && testCases.length > 0;

  return {
    success: allPassed,
    passedCount,
    totalTests: testCases.length,
    averageTimeMs: testCases.length ? Math.round(totalTimeMs / testCases.length) : 0,
    results
  };
}