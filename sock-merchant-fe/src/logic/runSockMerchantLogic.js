let pyodide = null;

async function loadPyodideOnce() {
  if (!pyodide) {
    pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
    });
  }
  return pyodide;
}

export async function runSockMerchantLogic(n, ar, userCode, language) {
  switch (language) {
    case "javascript":
      return runJavaScriptLogic(userCode, n, ar);
    case "python":
      return await runPythonLogic(userCode, n, ar);
    default:
      return "Unsupported language";
  }
}

export function runJavaScriptLogic(userCode, n, ar) {
  try {
    const wrappedCode = `
    ${userCode}
    return sockMerchant(${n}, [${ar.join(",")}]);
    `;
    const fn = new Function(wrappedCode);
    return fn();
  } catch (error) {
    throw new Error(`JS execution error: ${error.message}`);
  }
}

async function runPythonLogic(userCode, n, ar) {
  try {
    const pyodide = await loadPyodideOnce();

    const pythonInputSetup = `
n = ${n}
ar = ${JSON.stringify(ar)}
`;

    const fullCode = `
${pythonInputSetup}
${userCode}
result = sockMerchant(n, ar)
`;

    await pyodide.runPythonAsync(fullCode);
    const result = pyodide.globals.get("result");
    return result.toString();
  } catch (err) {
    return `Error executing Python code: ${err.message}`;
  }
}
