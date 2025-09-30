import { useState } from "react";
import { AnimatePresence } from "motion/react";
import RotateIcon from "..//components/RotateIcon";
import Counter from "../components/Counter";
import {
  CardType,
  HistoryType,
  ResultType,
  SwipeType,
  CARDS,
} from "../types/index";
import React from "react";
import { SimpleSwipeableCard } from "../components/SimpleSwipeableCard";
import { SwipeableCard } from "../components/SwipeableCard";
const Home: React.FC = () => {
  const [cards, setCards] = useState(CARDS);
  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  const [history, setHistory] = useState<HistoryType[]>([]);
  // index of last card
  const activeIndex = cards.length - 1;
  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setCards((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };
  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
      setCards((current) => [...current, newCard]);
    }
  };
  return (
    <div
      className ="min-h-screen bg-background flex justify-center items-center"
    >
    <div className="relative flex flex-col justify-center items-center w-full h-screen bg-gradient-to-b from-blue-500 to-purple-600">
      <AnimatePresence>
        {cards.map((card, index:number) => (
          <SimpleSwipeableCard
            key={index}
            active={index === activeIndex}
            removeCard={removeCard}
            card={card}
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 ? (
        <span className="text-white text-xl">End of Stack</span>
      ) : null}
      <footer className="absolute bottom-4 flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={history.length === 0}
            className="w-14 h-14 rounded-full text-black bg-white inline-flex justify-center items-center disabled:cursor-not-allowed"
            onClick={undoSwipe}
            data-testid="undo-btn"
            aria-label="Undo Swipe"
          >
            <RotateIcon strokeWidth={3} />
          </button>
          <span className="text-xs text-white">Undo</span>
        </div>
        <Counter label="Likes" count={result.like} testid="like-count" />
        <Counter label="Nopes" count={result.nope} testid="nope-count" />
        <Counter
          label="Superlike"
          count={result.superlike}
          testid="superlike-count"
        />
      </footer>
    </div>

    </div>
  );


};

export default Home;
