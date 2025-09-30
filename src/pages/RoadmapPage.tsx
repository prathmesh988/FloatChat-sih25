import React, { useState } from 'react';
import { RoadmapCard } from '../components/RoadmapCard';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ChatWindow } from '../components/ChatWindow';
import { ArrowRight, BookOpen, Target, Users, Clock } from 'lucide-react';
import { roadmapData } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export function RoadmapPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartRoadmap = (roadmapId: string) => {
    const roadmap = roadmapData.find(r => r.id === roadmapId);
    if (roadmap) {
      setSelectedRoadmap(roadmapId);
      setCurrentStep(0);
      toast.success(`Started ${roadmap.title} learning path!`);
    }
  };

  const handleNextStep = () => {
    const roadmap = roadmapData.find(r => r.id === selectedRoadmap);
    if (roadmap && currentStep < roadmap.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const selectedRoadmapData = roadmapData.find(r => r.id === selectedRoadmap);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRoadmap ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-4">Learning Roadmaps</h1>
              <p className="text-muted-foreground mb-6">
                Structured learning paths to help you master ARGO oceanographic data analysis. 
                Choose your level and follow guided sequences of queries and visualizations.
              </p>
              
              {/* Overview Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Roadmaps</span>
                  </div>
                  <div className="text-2xl font-medium">{roadmapData.length}</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Steps</span>
                  </div>
                  <div className="text-2xl font-medium">
                    {roadmapData.reduce((sum, roadmap) => sum + roadmap.steps.length, 0)}
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Floats Used</span>
                  </div>
                  <div className="text-2xl font-medium">
                    {roadmapData.reduce((sum, roadmap) => sum + roadmap.floatsUsed, 0)}
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Avg Time</span>
                  </div>
                  <div className="text-2xl font-medium">45min</div>
                </div>
              </div>
            </div>

            {/* Roadmap Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapData.map((roadmap) => (
                <RoadmapCard 
                  key={roadmap.id} 
                  roadmap={roadmap} 
                  onStart={handleStartRoadmap}
                />
              ))}
            </div>

            {/* Learning Path Flow */}
            <div className="mt-12">
              <h2 className="mb-6">How Learning Paths Work</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h3 className="mb-2">Choose Your Level</h3>
                  <p className="text-muted-foreground text-sm">
                    Start with Beginner, Intermediate, or Advanced based on your experience with oceanographic data.
                  </p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h3 className="mb-2">Follow Guided Steps</h3>
                  <p className="text-muted-foreground text-sm">
                    Each roadmap contains carefully sequenced queries and visualizations to build your understanding.
                  </p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h3 className="mb-2">Apply Your Knowledge</h3>
                  <p className="text-muted-foreground text-sm">
                    Use what you've learned to explore real ARGO data and make your own discoveries.
                  </p>
                </Card>
              </div>
            </div>
          </>
        ) : (
          /* Active Roadmap View */
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedRoadmap(null)}
                  className="gap-2"
                >
                  ← Back to Roadmaps
                </Button>
                <Badge className="ml-auto">
                  Step {currentStep + 1} of {selectedRoadmapData?.steps.length}
                </Badge>
              </div>
              
              <h1 className="mb-2">{selectedRoadmapData?.title}</h1>
              <p className="text-muted-foreground">{selectedRoadmapData?.description}</p>
            </div>

            {/* Progress */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3>Learning Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((currentStep + 1) / (selectedRoadmapData?.steps.length || 1)) * 100)}% Complete
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentStep + 1) / (selectedRoadmapData?.steps.length || 1)) * 100}%` 
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  Previous Step
                </Button>
                
                <div className="text-center">
                  <h4 className="mb-1">Current Step:</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedRoadmapData?.steps[currentStep]}
                  </p>
                </div>
                
                <Button 
                  onClick={handleNextStep}
                  disabled={currentStep === (selectedRoadmapData?.steps.length || 1) - 1}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Interactive Learning */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatWindow 
                  initialMessage={selectedRoadmapData?.steps[currentStep]}
                />
              </div>
              
              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="mb-4">All Steps</h3>
                  <div className="space-y-2">
                    {selectedRoadmapData?.steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-md text-sm cursor-pointer transition-colors ${
                          index === currentStep 
                            ? 'bg-primary text-primary-foreground' 
                            : index < currentStep 
                              ? 'bg-muted text-muted-foreground line-through'
                              : 'bg-muted/50 text-muted-foreground'
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-current bg-opacity-20 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="mb-4">Roadmap Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge>{selectedRoadmapData?.level}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Time:</span>
                      <span>{selectedRoadmapData?.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floats Used:</span>
                      <span>{selectedRoadmapData?.floatsUsed}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}