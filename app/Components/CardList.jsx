'use client';

import Link from 'next/link';

export default function CardList({ cards, folders, onDelete }) {
  return (
    <ul className="space-y-3">
      {cards.length === 0 && <li>No cards found.</li>}
      {cards.map(card => (
        <li key={card.id} className="border p-3 rounded bg-white dark:bg-gray-800 flex justify-between items-center">
          <div>
            <strong>Q:</strong> {card.front} <br />
            <small className="text-gray-600 dark:text-gray-400">Folder: {folders.find(f => f.id === card.folderId)?.name || 'Unknown'}</small>
          </div>
          <div className="space-x-2">
            <Link href={`/edit/${card.id}`}>
              <button className="bg-yellow-400 px-3 py-1 rounded text-black">Edit</button>
            </Link>
            <button
              onClick={() => onDelete(card.id)}
              className="bg-red-600 px-3 py-1 rounded text-white"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
