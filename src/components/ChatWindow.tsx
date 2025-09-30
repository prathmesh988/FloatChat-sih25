import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, Bot, User, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  floatsUsed?: string[];
  visualizations?: string[];
}

interface ChatWindowProps {
  initialMessage?: string;
}

export function ChatWindow({ initialMessage }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm FloatChat, your AI assistant for exploring ARGO oceanographic data. I can help you discover temperature profiles, salinity measurements, biogeochemical data, and much more from thousands of ocean floats worldwide. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState(initialMessage || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponseData = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseData.content,
        timestamp: new Date(),
        floatsUsed: aiResponseData.floatsUsed,
        visualizations: aiResponseData.visualizations
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): { content: string; floatsUsed?: string[]; visualizations?: string[] } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('temperature')) {
      return {
        content: "I found 15 ARGO floats with temperature data in your area of interest. The analysis reveals fascinating thermal stratification: surface temperatures range from 18-25°C with a pronounced thermocline at 50-100m depth, transitioning to stable deep waters (2-4°C below 1000m). Seasonal variations show maximum surface warming in late summer (August-September) with winter cooling creating deeper mixed layers. The data suggests possible warm water intrusions from nearby current systems. Would you like me to generate specific depth profiles, time series analysis, or comparative regional studies?",
        floatsUsed: ["WMO 6901234", "WMO 6901567", "WMO 6902123"],
        visualizations: ["temperature-depth-profile", "seasonal-time-series", "geographic-heatmap"]
      };
    }
    
    if (lowerQuery.includes('salinity')) {
      return {
        content: "Analyzing salinity measurements from 12 nearby ARGO floats reveals complex hydrographic structure. Surface salinities range 33.8-35.2 PSU with distinct freshwater lenses in the upper 30m, likely from precipitation or river runoff. The halocline shows interesting step-like structure between 100-200m depth, indicating water mass mixing. Deep salinities are remarkably stable (34.7±0.05 PSU), characteristic of this region's deep water masses. Recent measurements show a slight freshening trend in intermediate waters (300-800m), possibly linked to climate variability. I can generate detailed salinity-depth profiles, water mass analysis, or seasonal comparison charts.",
        floatsUsed: ["WMO 6901234", "WMO 6901890", "WMO 6902456"],
        visualizations: ["salinity-depth-profile", "water-mass-diagram", "trend-analysis"]
      };
    }
    
    if (lowerQuery.includes('bgc') || lowerQuery.includes('biogeochemical') || lowerQuery.includes('oxygen')) {
      return {
        content: "BGC sensor analysis from 8 biogeochemical floats reveals remarkable ecosystem dynamics. The oxygen minimum zone (OMZ) is well-defined at 400-800m depth with concentrations dropping to <20 μmol/kg, indicating intense remineralization processes. Chlorophyll-a peaks (0.8-1.2 mg/m³) occur at 40-60m depth, marking the deep chlorophyll maximum where phytoplankton communities thrive in optimal light-nutrient conditions. Nitrate concentrations show classic nutricline structure with depletion in surface waters and maximum values (25-30 μmol/L) at 200-400m. Recent measurements indicate potential OMZ expansion and intensification, consistent with global ocean deoxygenation trends. pH values show concerning acidification signals with lower values in upwelling zones.",
        floatsUsed: ["WMO 6901567", "WMO 6901890", "WMO 6902123"],
        visualizations: ["oxygen-depth-profile", "chlorophyll-contour", "nutrient-correlation", "ph-time-series"]
      };
    }
    
    if (lowerQuery.includes('location') || lowerQuery.includes('coordinate') || lowerQuery.includes('near')) {
      return {
        content: "I can locate ARGO floats near any geographic position worldwide. Please provide coordinates (e.g., 45.5°N, 30.2°W) or describe your region of interest (e.g., 'North Atlantic', 'Mediterranean Sea', 'Southern Ocean'). I'll identify active floats within your specified radius, show their current positions and drift trajectories, and list available parameters (temperature, salinity, BGC sensors). I can also provide historical data coverage, deployment dates, and real-time status updates. For precise analysis, I recommend coordinates with desired search radius (e.g., within 100-500 km).",
        floatsUsed: [],
        visualizations: ["interactive-map", "float-trajectories", "data-coverage-grid"]
      };
    }
    
    if (lowerQuery.includes('compare') || lowerQuery.includes('comparison')) {
      return {
        content: "I excel at comparative oceanographic analysis across multiple dimensions. I can compare: (1) Regional differences - Atlantic vs Pacific thermal structure, Arctic vs Antarctic water masses; (2) Temporal variations - seasonal cycles, interannual variability, climate trends; (3) Parameter relationships - T-S diagrams, oxygen-temperature correlations, nutrient stoichiometry; (4) Float types - core vs BGC capabilities, different sensor accuracies; (5) Depth zones - surface mixed layer vs thermocline vs deep water properties. Recent comparisons reveal significant regional differences in climate change responses, with polar regions showing accelerated warming and freshening. What specific comparison interests you most?",
        floatsUsed: ["WMO 6901234", "WMO 6901567", "WMO 6901890", "WMO 6902123", "WMO 6902456"],
        visualizations: ["comparative-profiles", "correlation-matrix", "trend-comparison", "regional-maps"]
      };
    }
    
    if (lowerQuery.includes('climate') || lowerQuery.includes('warming') || lowerQuery.includes('trend')) {
      return {
        content: "Climate analysis using ARGO data reveals alarming oceanographic trends. Over the past 15 years, I've detected: (1) Global ocean warming at 0.33±0.12 W/m² with strongest signals in the upper 2000m; (2) Accelerated freshening in polar regions from ice melt, counteracted by evaporation-driven salinification in subtropical gyres; (3) Ocean acidification progression with pH declining 0.02 units per decade in surface waters; (4) Oxygen loss in intermediate waters (200-800m) with OMZ expansion; (5) Stratification increase reducing vertical mixing and nutrient transport. Regional hotspots include the Arctic (fastest warming), Southern Ocean (enhanced CO₂ uptake), and tropical Pacific (El Niño intensification). These changes have profound implications for marine ecosystems and global climate regulation.",
        floatsUsed: ["WMO 6901234", "WMO 6901567", "WMO 6901890", "WMO 6902123", "WMO 6902456"],
        visualizations: ["climate-trends", "warming-patterns", "acidification-map", "oxygen-decline"]
      };
    }
    
    return {
      content: "That's an excellent question about oceanographic data! I have access to thousands of ARGO floats worldwide measuring temperature, salinity, pressure, and biogeochemical parameters (oxygen, nitrate, pH, chlorophyll). I can help you: explore regional oceanography, analyze climate trends, investigate water mass properties, study marine ecosystems, compare seasonal patterns, identify anomalies and extreme events, generate custom visualizations, and explain complex oceanographic phenomena. I work with real-time and historical data from core ARGO, BGC-ARGO, and Deep ARGO programs. Could you specify your region of interest, parameters of focus, or particular research question?",
      floatsUsed: [],
      visualizations: ["data-overview", "global-coverage-map"]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      toast.success('Message copied to clipboard!');
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy message');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              {message.type === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            
            <Card className={`max-w-[80%] p-3 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <div className="space-y-3">
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Floats Used - AI messages only */}
                {message.type === 'ai' && message.floatsUsed && message.floatsUsed.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Floats Used:</div>
                    <div className="flex flex-wrap gap-1">
                      {message.floatsUsed.map((floatId, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-background/50 text-foreground">
                          {floatId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Visualizations - AI messages only */}
                {message.type === 'ai' && message.visualizations && message.visualizations.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Available Visualizations:</div>
                    <div className="flex flex-wrap gap-1">
                      {message.visualizations.map((viz, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent/50 text-accent-foreground">
                          {viz.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Footer with timestamp and copy button */}
                <div className={`flex items-center justify-between text-xs ${
                  message.type === 'user' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  <Button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 p-0 ${
                      message.type === 'user' 
                        ? 'hover:bg-primary-foreground/20 text-primary-foreground/70' 
                        : 'hover:bg-muted-foreground/20'
                    }`}
                  >
                    {copiedMessageId === message.id ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <Card className="bg-muted p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ARGO data, ocean temperatures, salinity profiles..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}