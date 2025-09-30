import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShareButtons } from './ShareButtons';
import { Heart, Bookmark, MapPin, Calendar, Layers, Activity, Star } from 'lucide-react';

interface FeedCardProps {
  float: {
    id: string;
    title: string;
    description: string;
    region: string;
    parameter: string;
    domain: string;
    tags: string[];
    lastUpdate: string;
    depth: string;
    likes: number;
    saves: number;
    floatId: string;
    coordinates: { lat: number; lon: number };
    dataPoints: number;
    status: string;
    personalizedScore?: number;
    isPersonalized?: boolean;
  };
}

export function FeedCard({ float }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(float.likes);
  const [saveCount, setSaveCount] = useState(float.saves);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
    setSaveCount(prev => saved ? prev - 1 : prev + 1);
  };

  const getDomainColor = (domain: string) => {
    switch (domain.toLowerCase()) {
      case 'physical oceanography':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'biogeochemical':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'climate studies':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${
      float.isPersonalized ? 'ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getDomainColor(float.domain)}>
                {float.domain}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {float.status}
              </Badge>
              {float.isPersonalized && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 gap-1">
                  <Star className="h-3 w-3" />
                  For You
                </Badge>
              )}
            </div>
            <h3 className="leading-tight">{float.title}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground mb-4 text-sm">
          {float.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{float.region}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Activity className="h-3 w-3" />
            <span>{float.parameter}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Layers className="h-3 w-3" />
            <span>{float.depth}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(float.lastUpdate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {float.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          <div>Float ID: {float.floatId}</div>
          <div>Data Points: {float.dataPoints.toLocaleString()}</div>
          <div>
            Coordinates: {float.coordinates.lat.toFixed(1)}°, {float.coordinates.lon.toFixed(1)}°
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`gap-1 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`gap-1 ${saved ? 'text-blue-500' : 'text-muted-foreground'}`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
              <span>{saveCount}</span>
            </Button>
          </div>

          <ShareButtons 
            title={float.title}
            description={float.description}
            url={`https://floatchat.app/float/${float.id}`}
          />
        </div>
      </CardFooter>
    </Card>
  );
}