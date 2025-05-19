'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function getDefaultData() {
  return {
    folders: [
      { id: 'js', name: 'JavaScript' },
      { id: 'react', name: 'React' },
      { id: 'python', name: 'Python' },
    ],
    cards: [
      {
        id: 1,
        folderId: 'js',
        front: 'What is closure in JavaScript?',
        back: 'Closure is a function that has access to its own scope, the outer function\'s scope, and the global scope.',
        lastReviewed: null,
        interval: 1,
        nextReview: new Date().toISOString().split('T')[0],
        easeFactor: 2.5,
        repetitions: 0,
      },
      {
        id: 2,
        folderId: 'react',
        front: 'What is a React Hook?',
        back: 'Hooks are functions that let you “hook into” React state and lifecycle features from function components.',
        lastReviewed: null,
        interval: 1,
        nextReview: new Date().toISOString().split('T')[0],
        easeFactor: 2.5,
        repetitions: 0,
      },
      {
        id: 3,
        folderId: 'python',
        front: 'What is a list comprehension?',
        back: 'A concise way to create lists using a single line of code.',
        lastReviewed: null,
        interval: 1,
        nextReview: new Date().toISOString().split('T')[0],
        easeFactor: 2.5,
        repetitions: 0,
      },
    ],
  };
}

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('flashcardData'));
    if (!data) {
      data = getDefaultData();
      localStorage.setItem('flashcardData', JSON.stringify(data));
    }
    setFolders(data.folders);
    setCards(data.cards);

    const today = new Date().toISOString().split('T')[0];
    const dueToday = data.cards.filter(card => card.nextReview <= today);
    setDueCount(dueToday.length);
  }, []);

  const filteredCards = selectedFolder === 'all' ? cards : cards.filter(c => c.folderId === selectedFolder);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setSelectedFolder('all')}
          className={`px-3 py-1 rounded ${selectedFolder === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
        >
          All Folders
        </button>
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`px-3 py-1 rounded ${
              selectedFolder === folder.id ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            {folder.name}
          </button>
        ))}
      </div>

      <p className="mb-4">
        Cards due today: <span className="font-semibold">{dueCount}</span>
      </p>

      <div className="space-x-4 mb-8">
        <Link href="/review" className="bg-blue-600 text-white px-4 py-2 rounded">
          Start Review
        </Link>
        <Link href={`/add?folder=${selectedFolder}`} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Card
        </Link>
        <Link href="/stats" className="bg-purple-600 text-white px-4 py-2 rounded">
          View Stats
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-2">Flashcards {selectedFolder === 'all' ? '' : `in ${folders.find(f => f.id === selectedFolder)?.name}`}</h2>
      <ul className="space-y-3">
        {filteredCards.length === 0 && <li>No cards in this folder.</li>}
        {filteredCards.map(card => (
          <li key={card.id} className="border p-3 rounded bg-white dark:bg-gray-800">
            <strong>Q:</strong> {card.front}
            <br />
            <small className="text-gray-600 dark:text-gray-400">Folder: {folders.find(f => f.id === card.folderId)?.name || 'Unknown'}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
