import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, ChevronRight, BookOpen } from 'lucide-react';

interface RoadmapCardProps {
  roadmap: {
    id: string;
    title: string;
    description: string;
    level: string;
    steps: string[];
    estimatedTime: string;
    floatsUsed: number;
  };
  onStart: (roadmapId: string) => void;
}

export function RoadmapCard({ roadmap, onStart }: RoadmapCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getLevelColor(roadmap.level)}>
                {roadmap.level}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {roadmap.estimatedTime}
              </div>
            </div>
            <h3 className="leading-tight">{roadmap.title}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">
          {roadmap.description}
        </p>

        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium">Learning Path:</h4>
          <div className="space-y-2">
            {roadmap.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{roadmap.floatsUsed} floats used</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{roadmap.steps.length} steps</span>
          </div>
        </div>

        <Button 
          onClick={() => onStart(roadmap.id)} 
          className="w-full gap-2"
        >
          Start Learning Path
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}