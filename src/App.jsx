import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Robots from './pages/Robots';
import Tasks from './pages/Tasks';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/robots" element={<Robots />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Layout>
  );
}

export default App;

