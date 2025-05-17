import '../SockMerchantForm.scss';
import { useState } from "react";
import { runSockMerchantLogic } from "../logic/runSockMerchantLogic";

export default function SockMerchantForm() {
  const [n, setN] = useState("");
  const [sockColors, setSockColors] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedColors = sockColors
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((num) => !isNaN(num));

    const parsedN = parseInt(n, 10);

    if (parsedColors.length !== parsedN) {
      setResult("Error: Number of socks does not match input array length.");
      return;
    }

    setLoading(true);
    setResult(null);

    const output = await runSockMerchantLogic(parsedN, parsedColors, code, language);
    setResult(output);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
    <h1 className="form-title">#PinsToPixels Sock Merchant Tester</h1>

    <div className="form-group">
        <label htmlFor="sock-count" className="form-label">Number of socks</label>
        <input
        id="sock-count"
        type="number"
        value={n}
        onChange={(e) => setN(e.target.value)}
        className="form-input"
        min={1}
        required
        aria-describedby="sock-count-help"
        />
        <p id="sock-count-help" className="form-help-text">Enter total number of socks</p>
    </div>

    <div className="form-group">
        <label htmlFor="sock-colors" className="form-label">Sock colors (comma-separated)</label>
        <input
        id="sock-colors"
        type="text"
        value={sockColors}
        onChange={(e) => setSockColors(e.target.value)}
        className="form-input"
        placeholder="e.g. 10,20,10,30,10,20"
        required
        aria-describedby="sock-colors-help"
        />
        <p id="sock-colors-help" className="form-help-text">
        Comma-separated list of sock colors matching the count
        </p>
    </div>

    <div className="form-group">
        <label htmlFor="language" className="form-label">Select language</label>
        <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="form-input"
        >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        </select>
    </div>

    <div className="form-group">
        <label htmlFor="code" className="form-label">Paste your logic code here</label>
        <textarea
        id="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        placeholder="Paste your function implementation here..."
        required
        className="form-textarea"
        spellCheck="false"
        aria-multiline="true"
        />
    </div>

    <button
        type="submit"
        disabled={loading}
        className="form-button"
    >
        {loading ? "Running..." : "Run Logic"}
    </button>

    {result !== null && (
        <div
        role="region"
        aria-live="polite"
        className="form-result"
        >
        <strong>Result:</strong> {result}
        </div>
    )}
    </form>
  );
}
