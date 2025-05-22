import { useCallback } from "react";
import { runJavaScriptLogic } from "../logic/runSockMerchantLogic";

let pyodideInstance = null;

async function loadPyodide() {
  if (!pyodideInstance) {
    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
    });
  }
  return pyodideInstance;
}

export function useLogicHandler() {
  const execute = useCallback(async ({ code, input, language }) => {
    const { n, ar } = input;

    if (language === "javascript") {
      try {
        // run JS code using existing helper
        const result = runJavaScriptLogic(code, n, ar);
        return { result };
      } catch (error) {
        return { error: `JavaScript error: ${error.message}` };
      }
    }

    if (language === "python") {
      try {
        const pyodide = await loadPyodide();

        const setupVars = `
        n = ${n}
        ar = ${JSON.stringify(ar)}
        `;

        const fullPythonCode = `
        ${setupVars}
        ${code}
        result = sockMerchant(n, ar)
        `;

        await pyodide.runPythonAsync(fullPythonCode);
        const res = pyodide.globals.get("result");
        return { result: res.toString() };
      } catch (error) {
        return { error: `Python error: ${error.message}` };
      }
    }

    return { error: "Language not supported" };
  }, []);

  return { execute };
}
