import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { CardType, SwipeType } from '../types/index';

interface SimpleSwipeableCardProps {
  card: CardType;
  active: boolean;
  removeCard: (oldCard: CardType, swipe: SwipeType) => void;
}

export function SimpleSwipeableCard({ card, active, removeCard }: SimpleSwipeableCardProps) {
  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  // Swipe indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);
  const superlikeOpacity = useTransform(x, [-50, 0, 50], [0, 0, 0]); // For y-axis swipe

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Determine swipe direction based on offset and velocity
    if (offset > threshold || velocity > 500) {
      removeCard(card, 'like');
    } else if (offset < -threshold || velocity < -500) {
      removeCard(card, 'nope');
    } else if (info.velocity.y < -500) {
      removeCard(card, 'superlike');
    }
  };

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 right-8 z-10 bg-green-500 text-white px-4 py-2 rounded-lg font-medium transform rotate-12"
      >
        LIKE
      </motion.div>
      
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 left-8 z-10 bg-red-500 text-white px-4 py-2 rounded-lg font-medium transform -rotate-12"
      >
        NOPE
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-80 h-96 cursor-grab active:cursor-grabbing rounded-xl shadow-xl"
        style={{ 
          x, 
          rotate, 
          opacity,
          backgroundColor: card.color
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center justify-center h-full text-white p-8">
          <div className="text-8xl mb-4">{card.emoji}</div>
          <h3 className="text-2xl font-bold text-center">{card.name}</h3>
        </div>
      </motion.div>
    </div>
  );
}
