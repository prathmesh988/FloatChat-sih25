import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Copy, Clock, BarChart3, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PromptCardProps {
  prompt: {
    id: string;
    query: string;
    timestamp: string;
    response: string;
    floatsUsed: string[];
    visualizations: string[];
    likes: number;
    domain: string;
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(prompt.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.query);
      toast.success('Prompt copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
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

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case 'depth-profile':
      case 'time-series':
      case 'comparison-chart':
        return <BarChart3 className="h-3 w-3" />;
      case 'geographic-map':
      case 'location-map':
        return <MapPin className="h-3 w-3" />;
      default:
        return <BarChart3 className="h-3 w-3" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getDomainColor(prompt.domain)}>
                {prompt.domain}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(prompt.timestamp).toLocaleDateString()}
              </div>
            </div>
            <h3 className="leading-tight">"{prompt.query}"</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="bg-muted p-3 rounded-md mb-4">
          <p className="text-sm leading-relaxed">{prompt.response}</p>
        </div>

        <div className="space-y-3">
          {/* Floats Used */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Floats Used:</div>
            <div className="flex flex-wrap gap-1">
              {prompt.floatsUsed.map((floatId, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {floatId}
                </Badge>
              ))}
            </div>
          </div>

          {/* Visualizations */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Visualizations:</div>
            <div className="flex flex-wrap gap-1">
              {prompt.visualizations.map((viz, index) => (
                <Badge key={index} variant="secondary" className="text-xs gap-1">
                  {getVisualizationIcon(viz)}
                  {viz.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
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
            onClick={copyPrompt}
            className="gap-1"
          >
            <Copy className="h-4 w-4" />
            Copy Prompt
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}