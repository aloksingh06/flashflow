'use client';

import { useEffect, useState } from 'react';

export default function Review() {
  const [cards, setCards] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('flashcardData') || '{"cards":[],"folders":[]}');
    const today = new Date().toISOString().split('T')[0];
    const dueCards = data.cards.filter(c => c.nextReview <= today);

    setCards(dueCards);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (cards.length === 0) return <div>No cards due for review today. 🎉</div>;

  const card = cards[currentIdx];

  // Update card after review (simplified SM-2 algorithm)
  const handleReview = (quality) => {
    // quality: 0 (hard), 1 (medium), 2 (easy)
    const data = JSON.parse(localStorage.getItem('flashcardData'));
    const allCards = data.cards;

    const cardToUpdate = allCards.find(c => c.id === card.id);
    if (!cardToUpdate) return;

    const now = new Date();

    if (quality === 2) {
      // easy
      cardToUpdate.repetitions++;
      cardToUpdate.easeFactor = Math.min(2.5 + 0.1, 2.5);
      cardToUpdate.interval = cardToUpdate.interval * cardToUpdate.easeFactor;
    } else if (quality === 1) {
      // medium
      cardToUpdate.repetitions++;
      cardToUpdate.easeFactor = Math.max(1.3, cardToUpdate.easeFactor - 0.15);
      cardToUpdate.interval = cardToUpdate.interval * 1.2;
    } else {
      // hard
      cardToUpdate.repetitions = 0;
      cardToUpdate.interval = 1;
      cardToUpdate.easeFactor = Math.max(1.3, cardToUpdate.easeFactor - 0.3);
    }

    cardToUpdate.lastReviewed = now.toISOString().split('T')[0];
    const nextReviewDate = new Date(now.getTime() + cardToUpdate.interval * 24 * 60 * 60 * 1000);
    cardToUpdate.nextReview = nextReviewDate.toISOString().split('T')[0];

    localStorage.setItem('flashcardData', JSON.stringify({ ...data, cards: allCards }));

    setShowAnswer(false);

    if (currentIdx + 1 < cards.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      alert('Review session complete! 🎉');
      setCards([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">📖 Review Flashcards</h2>
      <div className="border rounded p-6 mb-4 min-h-[120px] flex flex-col justify-center bg-gray-100 dark:bg-gray-700 cursor-pointer"
           onClick={() => setShowAnswer(!showAnswer)}
           title="Click to flip card"
      >
        {!showAnswer ? (
          <div className="text-lg font-semibold">{card.front}</div>
        ) : (
          <div className="text-lg text-green-600">{card.back}</div>
        )}
      </div>
      {showAnswer && (
        <div className="space-x-4">
          <button
            onClick={() => handleReview(2)}
            className="bg-green-600 text-white px-4 py-2 rounded"
            title="Easy"
          >
            Easy
          </button>
          <button
            onClick={() => handleReview(1)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            title="Medium"
          >
            Medium
          </button>
          <button
            onClick={() => handleReview(0)}
            className="bg-red-600 text-white px-4 py-2 rounded"
            title="Hard"
          >
            Hard
          </button>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {currentIdx + 1} / {cards.length} cards
      </p>
    </div>
  );
}