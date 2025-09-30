import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Layers, Users, Clock, TrendingUp, Waves, Thermometer } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';

interface SwipeableCardProps {
  card: {
    id: string;
    title: string;
    description: string;
    region: string;
    parameter: string;
    domain: string;
    tags: string[];
    coordinates: { lat: number; lon: number };
    depth: string;
    floatId: string;
    discoveryLevel: string;
    rarity: string;
    insights: string;
    visualPreview: string;
    collaborators: number;
    lastUpdate: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
  getRarityColor: (rarity: string) => string;
  getDiscoveryLevelColor: (level: string) => string;
}

export function SwipeableCard({ card, onSwipe, getRarityColor, getDiscoveryLevelColor }: SwipeableCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  // Swipe indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Determine swipe direction based on offset and velocity
    if (offset > threshold || velocity > 500) {
      onSwipe('right');
    } else if (offset < -threshold || velocity < -500) {
      onSwipe('left');
    }
  };

  const getParameterIcon = (parameter: string) => {
    switch (parameter.toLowerCase()) {
      case 'temperature':
        return <Thermometer className="h-4 w-4" />;
      case 'currents':
        return <Waves className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-full flex items-center">
      {/* Swipe Indicators */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 right-8 z-10 bg-green-500 text-white px-4 py-2 rounded-lg font-medium transform rotate-12"
      >
        INTERESTED
      </motion.div>
      
      <motion.div
        style={{ opacity: dislikeOpacity }}
        className="absolute top-8 left-8 z-10 bg-red-500 text-white px-4 py-2 rounded-lg font-medium transform -rotate-12"
      >
        PASS
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full h-[550px] cursor-grab active:cursor-grabbing"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
          <CardHeader className="pb-4 relative">
            <div className="absolute top-4 right-4 z-10">
          {/* Header with Discovery Level Badge */}
              <Badge className={`${getDiscoveryLevelColor(card.discoveryLevel)} border-0`}>
                {card.discoveryLevel}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-20">
                  <h3 className="leading-tight mb-2">{card.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {card.region}
                    </Badge>
                    <Badge className={getRarityColor(card.rarity)}>
                      {card.rarity}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  {getParameterIcon(card.parameter)}
                  <span className="text-xs text-muted-foreground">Parameter</span>
                </div>
                <div className="text-sm font-medium">{card.parameter}</div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Depth Range</span>
                </div>
                <div className="text-sm font-medium">{card.depth}</div>
              </div>
            </div>

            {/* Float Information */}
            <div className="bg-accent/30 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Float ID</div>
              <div className="text-sm font-medium font-mono">{card.floatId}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {card.coordinates.lat.toFixed(1)}°N, {Math.abs(card.coordinates.lon).toFixed(1)}°{card.coordinates.lon < 0 ? 'W' : 'E'}
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
              <div className="text-xs text-primary/70 mb-2 font-medium">KEY INSIGHT</div>
              <p className="text-sm leading-relaxed">{card.insights}</p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Research Areas</div>
              <div className="flex flex-wrap gap-1">
                {card.tags.slice(0, 4).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag.replace('-', ' ')}
                  </Badge>
                ))}
                {card.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{card.tags.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{card.collaborators} researchers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{card.lastUpdate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}