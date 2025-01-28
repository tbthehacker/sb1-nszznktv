import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreatePaste } from './components/CreatePaste';
import { ViewPaste } from './components/ViewPaste';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<CreatePaste />} />
            <Route path="/:id" element={<ViewPaste />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;