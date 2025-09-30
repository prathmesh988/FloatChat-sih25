import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Settings, Save, RotateCcw, User, Globe, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { getUserPreferences, saveUserPreferences, clearUserPreferences, UserPreferences } from '../utils/preferences';
import { toast } from 'sonner@2.0.3';

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizationPanel({ isOpen, onClose }: CustomizationPanelProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(getUserPreferences());
  const [hasChanges, setHasChanges] = useState(false);

  const availableOptions = {
    domains: [
      'Physical Oceanography',
      'Biogeochemical', 
      'Climate Studies',
      'Marine Ecosystem'
    ],
    regions: [
      'North Atlantic',
      'South Atlantic', 
      'North Pacific',
      'South Pacific',
      'Arctic Ocean',
      'Southern Ocean',
      'Mediterranean Sea',
      'Arabian Sea',
      'Indian Ocean'
    ],
    parameters: [
      'Temperature',
      'Salinity',
      'Oxygen',
      'Carbon',
      'Chlorophyll',
      'pH',
      'Currents',
      'Density',
      'Nitrate'
    ],
    discoveryLevels: [
      'Breakthrough',
      'Scientific Milestone', 
      'High Impact',
      'Critical',
      'Alert'
    ]
  };

  useEffect(() => {
    if (isOpen) {
      setPreferences(getUserPreferences());
      setHasChanges(false);
    }
  }, [isOpen]);

  const togglePreference = (category: keyof typeof availableOptions, value: string) => {
    setPreferences(prev => {
      const currentArray = prev[category] || [];
      const updated = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      const newPrefs = { ...prev, [category]: updated };
      setHasChanges(true);
      return newPrefs;
    });
  };

  const handleSave = () => {
    saveUserPreferences(preferences);
    setHasChanges(false);
    toast.success('Preferences saved! Your feed will be personalized based on your interests.');
    onClose();
  };

  const handleReset = () => {
    clearUserPreferences();
    setPreferences(getUserPreferences());
    setHasChanges(false);
    toast.success('Preferences reset to default.');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh]"
      >
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <h2>Customize Your Experience</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Fine-tune your feed preferences to discover the most relevant oceanographic data for your research.
            </p>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6">
                {/* Research Domains */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-base font-medium">Research Domains</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select your areas of oceanographic interest
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableOptions.domains.map((domain) => (
                      <div key={domain} className="flex items-center gap-2">
                        <Switch
                          checked={preferences.domains.includes(domain)}
                          onCheckedChange={() => togglePreference('domains', domain)}
                        />
                        <Label className="text-sm cursor-pointer" onClick={() => togglePreference('domains', domain)}>
                          {domain}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Geographic Regions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-base font-medium">Geographic Regions</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose ocean regions you're most interested in
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableOptions.regions.map((region) => (
                      <div key={region} className="flex items-center gap-2">
                        <Switch
                          checked={preferences.regions.includes(region)}
                          onCheckedChange={() => togglePreference('regions', region)}
                        />
                        <Label className="text-sm cursor-pointer" onClick={() => togglePreference('regions', region)}>
                          {region}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Parameters */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-base font-medium">Ocean Parameters</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select the oceanographic measurements you focus on
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {availableOptions.parameters.map((parameter) => (
                      <div key={parameter} className="flex items-center gap-2">
                        <Switch
                          checked={preferences.parameters.includes(parameter)}
                          onCheckedChange={() => togglePreference('parameters', parameter)}
                        />
                        <Label className="text-sm cursor-pointer" onClick={() => togglePreference('parameters', parameter)}>
                          {parameter}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Discovery Levels */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-base font-medium">Discovery Importance</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose the types of discoveries you want to see most
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableOptions.discoveryLevels.map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <Switch
                          checked={preferences.discoveryLevels.includes(level)}
                          onCheckedChange={() => togglePreference('discoveryLevels', level)}
                        />
                        <Label className="text-sm cursor-pointer" onClick={() => togglePreference('discoveryLevels', level)}>
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Interests Summary */}
                {preferences.interests.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Label className="text-base font-medium">Your Current Interests</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on your exploration activity
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {preferences.interests.slice(0, 20).map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest.replace('-', ' ')}
                          </Badge>
                        ))}
                        {preferences.interests.length > 20 && (
                          <Badge variant="secondary" className="text-xs">
                            +{preferences.interests.length - 20} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Default
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}