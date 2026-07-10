"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";

interface Card {
  id: number;
  src: string;
  zIndex: number;
}

interface ImgStackProps {
  images: string[];
}

export default function ImgStack({ images }: ImgStackProps) {
  const [cards, setCards] = useState<Card[]>(
    images.map((src, index) => ({
      id: index,
      src: src,
      zIndex: 50 - index * 10,
    })),
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const minDragDistance: number = 50;

  // --- Responsive sizing: measure the container, derive everything else ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(384);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // All fan-out math is a fraction of the *measured* container width,
  // so the stack always stays inside its own box — no fixed-px offsets
  // that only worked at 384px and blew out on small screens.
  const cardWidthFraction = 0.58;
  const offsetFraction = -0.09;
  const verticalFraction = -0.018;

  const cardWidth = containerWidth * cardWidthFraction;
  const offsetIncrement = containerWidth * offsetFraction;
  const verticalOffset = containerWidth * verticalFraction;
  const dragBound = containerWidth * 0.35;

  const getCardStyles = useCallback(
    (index: number) => {
      const baseRotation = 2;
      const rotationIncrement = 4;

      // Center the fan as a whole instead of anchoring it at card 0.
      // Previously every card shifted further left with no rightward
      // counterbalance (x = index * offsetIncrement), so the stack was
      // lopsided — overflowing on the left, empty space on the right.
      // Subtracting the midpoint index makes the fan symmetric: earlier
      // cards shift right, later cards shift left, balanced around the
      // container's true center.
      const midpoint = (cards.length - 1) / 2;
      const centeredStep = index - midpoint;

      return {
        x: centeredStep * offsetIncrement,
        y: Math.abs(centeredStep) * verticalOffset,
        rotate: index === 0 ? 0 : -(baseRotation + index * rotationIncrement),
        scale: 1,
        transition: { duration: 0.5 },
      };
    },
    [offsetIncrement, verticalOffset, cards.length],
  );

  const handleDragStart = (_event: MouseEvent | TouchEvent, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: PanInfo) => {
    const dragDistance = Math.sqrt(
      Math.pow(info.point.x - dragStartPos.current.x, 2) +
        Math.pow(info.point.y - dragStartPos.current.y, 2),
    );

    if (isAnimating) return;
    if (dragDistance < minDragDistance) return;

    setIsAnimating(true);

    setCards((prevCards) => {
      const newCards = [...prevCards];
      const cardToMove = newCards.shift()!;
      newCards.push(cardToMove);

      return newCards.map((card, index) => ({
        ...card,
        zIndex: 50 - index * 10,
      }));
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-55 sm:max-w-65 md:max-w-[320px] lg:max-w-96 aspect-square my-8 sm:my-10 md:my-12 mx-auto"
    >
      {cards.map((card: Card, index: number) => {
        const isTopCard = index === 0;
        const cardStyles = getCardStyles(index);
        const canDrag = isTopCard && !isAnimating;

        return (
          <motion.div
            key={card.id}
            className="absolute origin-bottom-center overflow-hidden rounded-xl shadow-xl bg-white cursor-grab active:cursor-grabbing border border-gray-100"
            style={{
              zIndex: card.zIndex,
              aspectRatio: "5/7",
              width: cardWidth,
            }}
            animate={cardStyles}
            drag={canDrag}
            dragElastic={0.2}
            dragConstraints={{
              left: -dragBound,
              right: dragBound,
              top: -dragBound,
              bottom: dragBound,
            }}
            dragSnapToOrigin={true}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileHover={
              isTopCard
                ? {
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }
                : {}
            }
            whileDrag={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.1 },
            }}
          >
            <Image
              src={card.src}
              alt={`Card ${card.id + 1}`}
              fill
              className="object-cover rounded-lg pointer-events-none"
              sizes="(max-width: 480px) 130px, (max-width: 768px) 160px, 220px"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
