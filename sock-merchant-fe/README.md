# Sock Merchant Front-End

A **front-end playground** for the HackerRank “Sock Merchant” challenge, featuring **pluggable logic** in JavaScript and Python (via Pyodide), built with React and designed for **responsiveness** and **accessibility**.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Demo](#demo)
* [Getting Started](#getting-started)
* [Architecture](#architecture)
* [Folder Structure](#folder-structure)
* [Available Scripts](#available-scripts)
* [Testing & Accessibility](#testing--accessibility)
* [Contributing](#contributing)
* [License](#license)
* [Up Next](#🚀-quick-wins--next-steps)

---

## Overview

This repository holds a React-based front end for solving the HackerRank **Sock Merchant** problem. Users can:

1. Paste or write their own `sockMerchant(sockCount, sockColors)` implementation in **JavaScript** or **Python**.
2. Run it in-browser using a unified `useLogicHandler` hook that delegates to either a JS engine or Pyodide.
3. View results instantly, with full **responsive design** and **WCAG‑compliant accessibility**.

---

## Features

* **Multi‑language support** (JavaScript & Python)
* **Pluggable logic handler** (`useLogicHandler`)
* **In-browser Python** execution via [Pyodide](https://pyodide.org/)
* **Responsive layout** (mobile, tablet, desktop)
* **Accessibility**: semantic HTML, ARIA attributes, keyboard navigation, contrast-checked
* **Extensible**: ready for additional languages (e.g., C++/WASM) and problems

---

## Demo

Try it live by cloning and running locally (see below).

---

## Getting Started

### Prerequisites

* Node.js ≥ 14.x
* npm or Yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/NachoMoment/sock-merchant.git
cd sock-merchant/sock-merchant-fe

# Install dependencies
npm install     # or yarn install

# Start in development mode
npm run dev       # or yarn start
```

Open <http://localhost:recommendedPort> in your browser.

---

## Architecture

1. **React** app bootstrapped with Create React App (or Vite).
2. **Logic abstraction** via `useLogicHandler` hook:

   * Calls `runJavaScriptLogic` for JS input
   * Loads Pyodide once for Python execution
3. **Form component** (`SockMerchantForm.jsx`) handles input parsing, validation, and result display.
4. **Styles** are scoped in SCSS, preserving custom theme variables and ensuring accessibility.

---

## Folder Structure

```
sock-merchant-fe/
├── public/                 # Static assets, HTML template
├── src/
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom hooks (e.g., useLogicHandler)
│   ├── logic/              # Execution helpers (runJavaScriptLogic, Pyodide loader)
│   ├── styles/             # SCSS files with responsive & accessible rules
│   └── index.jsx           # Entry point
├── README.md               # ← You are here
├── package.json            # Dependencies & scripts
└── ...
```

---

## Available Scripts

From the project root:

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Run in development mode (hot reload) |
| `npm run build` | Create optimized production build    |

---

## Testing & Accessibility

* **Manual**:

  1. Keyboard‑only navigation
  2. Screen‑reader walkthrough (VoiceOver / NVDA)
  3. Lighthouse & axe-core audits
  4. Contrast ratio checks (WCAG AA)

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: description"`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the **MIT License**.

---

## 🚀 Quick Wins & Next Steps

Let’s build on what we’ve got with a few focused, short-term updates:

* **Polish the UX flow**: add inline error messages, clearer loading indicators, and smooth focus transitions.
* **Stub in a Remote Logic API**: set up a mock endpoint so we can swap in a real backend later.
* **Swap in Monaco Editor**: get basic syntax highlighting and auto-indent in place.
* **Launch a Dark Mode toggle**: give folks a quick switch between light and dark without overhauling styles.
* **Add tests**: integrate Jest with React Testing Library for core unit tests and include accessibility checks using jest-axe to ensure regressions are caught.
