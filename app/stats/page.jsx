'use client';

import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Stats() {
  const [folders, setFolders] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('flashcardData') || '{"cards":[],"folders":[]}');
    setFolders(data.folders || []);
    setCards(data.cards || []);
  }, []);

  // Cards count per folder
  const cardsPerFolder = folders.map(folder => ({
    name: folder.name,
    count: cards.filter(card => card.folderId === folder.id).length,
  }));

  // Due cards count per folder
  const today = new Date().toISOString().split('T')[0];
  const duePerFolder = folders.map(folder => ({
    name: folder.name,
    count: cards.filter(card => card.folderId === folder.id && card.nextReview <= today).length,
  }));

  const pieData = {
    labels: cardsPerFolder.map(c => c.name),
    datasets: [
      {
        label: '# of Cards',
        data: cardsPerFolder.map(c => c.count),
        backgroundColor: [
          '#3b82f6',
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#8b5cf6',
          '#ec4899',
        ],
        hoverOffset: 30,
      },
    ],
  };

  const barData = {
    labels: duePerFolder.map(c => c.name),
    datasets: [
      {
        label: 'Cards Due Today',
        data: duePerFolder.map(c => c.count),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">📊 Stats</h2>

      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-3">Total Cards by Folder</h3>
        <Pie data={pieData} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Cards Due Today by Folder</h3>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}
