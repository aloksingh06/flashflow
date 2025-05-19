'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dueCount, setDueCount] = useState(0);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const dueToday = cards.filter(card => card.nextReview <= today);
    setDueCount(dueToday.length);
    const allTags = [...new Set(cards.map(card => card.tag || ''))].filter(Boolean);
    setTags(allTags);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Flashcard Reviser</h1>
      <p className="mb-2">Cards due today: <span className="font-semibold">{dueCount}</span></p>
      <div className="mb-4">
        <Link href="/review" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Start Review</Link>
        <Link href="/add" className="bg-green-600 text-white px-4 py-2 rounded mr-2">Add Card</Link>
        <Link href="/stats" className="bg-purple-600 text-white px-4 py-2 rounded">View Stats</Link>
      </div>
      <h2 className="text-lg font-semibold mt-4">Available Tags:</h2>
      <ul className="list-disc list-inside">
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </main>
  );
}
