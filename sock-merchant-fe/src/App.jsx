import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SockMerchantForm from "./components/SockMerchantForm";

function App() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6">Sock Merchant Frontend</h1>
      <SockMerchantForm />
    </main>
  );
}

export default App;