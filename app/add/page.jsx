'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AddCard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [folderId, setFolderId] = useState('');
  const [folders, setFolders] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('flashcardData') || '{}');
    setFolders(data.folders || []);
    const defaultFolder = searchParams.get('folder');
    if (defaultFolder) setFolderId(defaultFolder);
  }, [searchParams]);

  const handleAdd = () => {
    if (!front.trim() || !back.trim() || !folderId) {
      alert('Please fill front, back, and select folder.');
      return;
    }

    const data = JSON.parse(localStorage.getItem('flashcardData') || '{"cards":[],"folders":[]}');
    const newCard = {
      id: Date.now(),
      folderId,
      front,
      back,
      lastReviewed: null,
      interval: 1,
      nextReview: new Date().toISOString().split('T')[0],
      easeFactor: 2.5,
      repetitions: 0,
    };

    localStorage.setItem('flashcardData', JSON.stringify({ ...data, cards: [...data.cards, newCard] }));
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Flashcard</h2>
      <label className="block mb-2">
        Folder:
        <select
          className="w-full border rounded p-2 mt-1 mb-4 bg-white dark:bg-gray-900"
          value={folderId}
          onChange={e => setFolderId(e.target.value)}
        >
          <option value="">Select Folder</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Front (Question):
        <input
          type="text"
          value={front}
          onChange={e => setFront(e.target.value)}
          className="w-full border rounded p-2 mb-4 bg-white dark:bg-gray-900"
        />
      </label>
      <label className="block mb-4">
        Back (Answer):
        <textarea
          value={back}
          onChange={e => setBack(e.target.value)}
          className="w-full border rounded p-2 h-24 resize-none bg-white dark:bg-gray-900"
        />
      </label>
      <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
        Add Card
      </button>
    </div>
  );
}
