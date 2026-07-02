'use client'

// MSC LEARN — interactive flashcard study component. Pick a deck, flip
// cards, and track progress. Deck content lives in src/data/learn.ts.

import { useState } from 'react'
import { learnDecks, type LearnDeck } from '@/data/learn'
import Icon from '@/components/shared/Icons'

function DeckCard({ deck, onStart }: { deck: LearnDeck; onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center">
          <Icon name={deck.icon} className="w-6 h-6" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-msc-amber bg-msc-amber-light rounded-full px-2.5 py-1">
          {deck.level}
        </span>
      </div>
      <h3 className="text-lg font-bold text-msc-charcoal mb-1.5">{deck.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{deck.description}</p>
      <span className="text-sm font-semibold text-msc-teal">
        {deck.cards.length} cards · Start deck →
      </span>
    </button>
  )
}

function StudyView({ deck, onExit }: { deck: LearnDeck; onExit: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)

  const card = deck.cards[index]
  const isLast = index === deck.cards.length - 1

  const next = () => {
    if (isLast) {
      setDone(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
    }
  }

  const restart = () => {
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
        <div className="w-14 h-14 rounded-2xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-5">
          <Icon name="check" className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-msc-charcoal mb-2">Deck complete!</h3>
        <p className="text-gray-600 mb-8">
          You reviewed all {deck.cards.length} cards in “{deck.title}.” Repetition is how vocabulary sticks — come back tomorrow.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={restart} className="btn-primary">Study Again</button>
          <button onClick={onExit} className="btn-secondary">Choose Another Deck</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-sm text-gray-500 hover:text-msc-teal font-medium transition-colors">
          ← All decks
        </button>
        <p className="text-sm text-gray-500 font-medium" aria-live="polite">
          Card {index + 1} of {deck.cards.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-msc-teal rounded-full transition-all duration-300"
          style={{ width: `${((index + (flipped ? 1 : 0.5)) / deck.cards.length) * 100}%` }}
        />
      </div>

      {/* The card */}
      <button
        onClick={() => setFlipped(!flipped)}
        aria-label={flipped ? 'Show term' : 'Reveal answer'}
        className="w-full min-h-[260px] bg-white rounded-3xl border border-gray-100 shadow-md p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow"
      >
        {!flipped ? (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Term</p>
            <p className="text-2xl md:text-3xl font-bold text-msc-charcoal">{card.front}</p>
            <p className="text-sm text-msc-teal font-medium mt-6">Tap to reveal →</p>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-4">Answer</p>
            <p className="text-lg md:text-xl font-semibold text-msc-charcoal leading-relaxed">{card.back}</p>
            {card.example && (
              <p className="text-sm text-gray-500 italic mt-4 leading-relaxed">{card.example}</p>
            )}
          </>
        )}
      </button>

      <div className="flex justify-center gap-3 mt-6">
        {!flipped ? (
          <button onClick={() => setFlipped(true)} className="btn-secondary">
            Reveal Answer
          </button>
        ) : (
          <button onClick={next} className="btn-primary">
            {isLast ? 'Finish Deck' : 'Next Card →'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function FlashcardStudy() {
  const [activeDeck, setActiveDeck] = useState<LearnDeck | null>(null)

  if (activeDeck) {
    return <StudyView deck={activeDeck} onExit={() => setActiveDeck(null)} />
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {learnDecks.map((deck) => (
        <DeckCard key={deck.slug} deck={deck} onStart={() => setActiveDeck(deck)} />
      ))}
    </div>
  )
}
