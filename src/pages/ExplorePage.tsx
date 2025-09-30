import React, { useState, useEffect } from 'react';
import { SwipeableCard } from '../components/SwipeableCard';
import { CustomizationPanel } from '../components/CustomizationPanel';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Heart, X, RotateCcw, TrendingUp, Eye, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { updateInterest, getUserPreferences, clearUserPreferences } from '../utils/preferences';

// Extended data specifically for the explore feature
const exploreFloatData = [
  {
    id: 'explore_001',
    title: 'Arctic Ocean Temperature Anomalies',
    description: 'Unusual warming patterns detected in Arctic waters. Float measurements show surface temperatures 3-5°C above historical averages, potentially indicating accelerated ice melt.',
    region: 'Arctic Ocean',
    parameter: 'Temperature',
    domain: 'Climate Studies',
    tags: ['arctic-warming', 'ice-melt', 'climate-change', 'anomaly'],
    coordinates: { lat: 75.2, lon: -10.5 },
    depth: '0-500m',
    floatId: 'WMO 6903001',
    discoveryLevel: 'High Impact',
    rarity: 'Rare',
    insights: 'This data reveals critical evidence of Arctic amplification - the phenomenon where Arctic regions warm faster than the global average.',
    visualPreview: 'temperature-anomaly-map',
    collaborators: 127,
    lastUpdate: '2 hours ago'
  },
  {
    id: 'explore_002',
    title: 'Deep Ocean Carbon Sink Discovery',
    description: 'BGC floats reveal a previously unknown carbon sequestration mechanism in the deep Southern Ocean, with CO₂ absorption rates 40% higher than expected.',
    region: 'Southern Ocean',
    parameter: 'Carbon',
    domain: 'Biogeochemical',
    tags: ['carbon-sink', 'deep-ocean', 'climate-mitigation', 'discovery'],
    coordinates: { lat: -62.8, lon: 45.3 },
    depth: '1000-3000m',
    floatId: 'WMO 6903045',
    discoveryLevel: 'Breakthrough',
    rarity: 'Ultra Rare',
    insights: 'This discovery could revolutionize our understanding of oceanic carbon cycles and climate change mitigation strategies.',
    visualPreview: 'carbon-flux-3d',
    collaborators: 89,
    lastUpdate: '1 day ago'
  },
  {
    id: 'explore_003',
    title: 'Mediterranean Marine Heatwave',
    description: 'Real-time monitoring of an intense marine heatwave affecting Mediterranean ecosystems. Temperature spikes of 6°C above normal threatening marine biodiversity.',
    region: 'Mediterranean Sea',
    parameter: 'Temperature',
    domain: 'Marine Ecosystem',
    tags: ['heatwave', 'ecosystem-impact', 'biodiversity', 'urgent'],
    coordinates: { lat: 40.1, lon: 15.2 },
    depth: '0-200m',
    floatId: 'WMO 6903078',
    discoveryLevel: 'Critical',
    rarity: 'Uncommon',
    insights: 'Marine heatwaves are becoming more frequent and intense, causing mass mortality events and ecosystem shifts.',
    visualPreview: 'heatwave-intensity',
    collaborators: 156,
    lastUpdate: '3 hours ago'
  },
  {
    id: 'explore_004',
    title: 'Oxygen Minimum Zone Expansion',
    description: 'Alarming expansion of oxygen-depleted waters in the Arabian Sea. Dead zones now cover 30% more area than in previous measurements.',
    region: 'Arabian Sea',
    parameter: 'Oxygen',
    domain: 'Biogeochemical',
    tags: ['dead-zone', 'oxygen-depletion', 'marine-life', 'expansion'],
    coordinates: { lat: 15.8, lon: 68.2 },
    depth: '200-800m',
    floatId: 'WMO 6903099',
    discoveryLevel: 'Alert',
    rarity: 'Common',
    insights: 'Ocean deoxygenation is accelerating, threatening marine ecosystems and fisheries worldwide.',
    visualPreview: 'oxygen-3d-map',
    collaborators: 234,
    lastUpdate: '6 hours ago'
  },
  {
    id: 'explore_005',
    title: 'Equatorial Undercurrent Anomaly',
    description: 'Unprecedented changes in the Pacific Equatorial Undercurrent affecting global weather patterns. Current speeds increased by 25% over 6 months.',
    region: 'Equatorial Pacific',
    parameter: 'Currents',
    domain: 'Physical Oceanography',
    tags: ['undercurrent', 'weather-patterns', 'el-nino', 'global-impact'],
    coordinates: { lat: 0.2, lon: -140.5 },
    depth: '50-300m',
    floatId: 'WMO 6903112',
    discoveryLevel: 'High Impact',
    rarity: 'Rare',
    insights: 'Changes in equatorial currents can trigger El Niño/La Niña events with global climate consequences.',
    visualPreview: 'current-velocity-map',
    collaborators: 178,
    lastUpdate: '4 hours ago'
  },
  {
    id: 'explore_006',
    title: 'Antarctic Deep Water Formation',
    description: 'Rare observation of Antarctic Bottom Water formation during winter. Dense, cold water masses sinking to abyssal depths carrying surface properties downward.',
    region: 'Antarctic Ocean',
    parameter: 'Density',
    domain: 'Physical Oceanography',
    tags: ['deep-water', 'formation', 'antarctic', 'winter-process'],
    coordinates: { lat: -70.5, lon: 2.1 },
    depth: '0-4000m',
    floatId: 'WMO 6903134',
    discoveryLevel: 'Scientific Milestone',
    rarity: 'Ultra Rare',
    insights: 'Antarctic Bottom Water drives global deep ocean circulation, affecting climate on millennial timescales.',
    visualPreview: 'water-mass-formation',
    collaborators: 67,
    lastUpdate: '12 hours ago'
  }
];

export function ExplorePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<{ [key: string]: 'liked' | 'disliked' }>({});
  const [discoveryProgress, setDiscoveryProgress] = useState(0);
  const [totalSwiped, setTotalSwiped] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Calculate progress
  useEffect(() => {
    const progress = (totalSwiped / exploreFloatData.length) * 100;
    setDiscoveryProgress(progress);
  }, [totalSwiped]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentCard = exploreFloatData[currentCardIndex];
    if (!currentCard) return;

    const swipeType = direction === 'right' ? 'liked' : 'disliked';
    const interested = direction === 'right';
    
    // Update user preferences based on swipe
    updateInterest(currentCard.id, interested, currentCard);
    
    setSwipedCards(prev => ({ ...prev, [currentCard.id]: swipeType }));
    setTotalSwiped(prev => prev + 1);
    
    if (direction === 'right') {
      setLikedCount(prev => prev + 1);
    }

    // Move to next card
    setCurrentCardIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setSwipedCards({});
    setTotalSwiped(0);
    setLikedCount(0);
    setDiscoveryProgress(0);
    // Optionally clear preferences for a fresh start
    // clearUserPreferences();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Ultra Rare':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Rare':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Uncommon':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDiscoveryLevelColor = (level: string) => {
    switch (level) {
      case 'Breakthrough':
      case 'Scientific Milestone':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'High Impact':
      case 'Critical':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
      case 'Alert':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    }
  };

  const currentCard = exploreFloatData[currentCardIndex];
  const hasMoreCards = currentCardIndex < exploreFloatData.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4">Explore Ocean Discoveries</h1>
          <p className="text-muted-foreground mb-6">
            Swipe through curated ARGO float discoveries. Swipe right to add to your interests, left to pass.
          </p>
          
          {/* Progress and Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Discoveries</span>
              </div>
              <div className="text-xl font-medium">{totalSwiped}/{exploreFloatData.length}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Interests</span>
              </div>
              <div className="text-xl font-medium">{likedCount}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Match Rate</span>
              </div>
              <div className="text-xl font-medium">
                {totalSwiped > 0 ? Math.round((likedCount / totalSwiped) * 100) : 0}%
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Progress</span>
              </div>
              <div className="text-xl font-medium">{Math.round(discoveryProgress)}%</div>
            </Card>
          </div>

          <Progress value={discoveryProgress} className="mb-4" />
          
          {/* Customization Button */}
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => setIsCustomizing(true)}
              variant="outline"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Customize Preferences
            </Button>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] flex items-center justify-center">
          {!hasMoreCards ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl">🎉</div>
              <h2>All discoveries explored!</h2>
              <p className="text-muted-foreground">
                You've reviewed all available discoveries. Your preferences have been saved to personalize your feed.
              </p>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  You showed interest in <span className="font-medium">{likedCount}</span> out of <span className="font-medium">{exploreFloatData.length}</span> discoveries
                </div>
                <Button onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Explore Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {currentCard && (
                  <SwipeableCard
                    card={currentCard}
                    onSwipe={handleSwipe}
                    getRarityColor={getRarityColor}
                    getDiscoveryLevelColor={getDiscoveryLevelColor}
                  />
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <Button
                  onClick={() => handleSwipe('left')}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-950"
                >
                  <X className="h-6 w-6 text-red-500" />
                </Button>
                <Button
                  onClick={() => handleSwipe('right')}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full border-2 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-950"
                >
                  <Heart className="h-6 w-6 text-green-500" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Customization Hint */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your preferences help us personalize your feed with relevant oceanographic discoveries.
          </p>
        </div>
      </div>
      
      {/* Customization Panel */}
      <CustomizationPanel 
        isOpen={isCustomizing}
        onClose={() => setIsCustomizing(false)}
      />
    </div>
  );
}