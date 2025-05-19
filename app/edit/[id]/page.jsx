'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [folderId, setFolderId] = useState('');
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('flashcardData') || '{"cards":[],"folders":[]}');
    setFolders(data.folders || []);
    const card = data.cards.find(c => c.id === parseInt(id));
    if (!card) {
      alert('Card not found');
      router.push('/');
      return;
    }
    setFront(card.front);
    setBack(card.back);
    setFolderId(card.folderId);
    setLoading(false);
  }, [id, router]);

  const handleUpdate = () => {
    if (!front.trim() || !back.trim() || !folderId) {
      alert('Please fill all fields.');
      return;
    }

    const data = JSON.parse(localStorage.getItem('flashcardData') || '{"cards":[],"folders":[]}');
    const updatedCards = data.cards.map(c =>
      c.id === parseInt(id) ? { ...c, front, back, folderId } : c
    );

    localStorage.setItem('flashcardData', JSON.stringify({ ...data, cards: updatedCards }));
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Flashcard</h2>
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
  <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
    Update Card
  </button>
</div>
);
}