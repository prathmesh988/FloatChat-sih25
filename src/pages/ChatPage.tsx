import React from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { chartData } from '../data/mockData';

export function ChatPage() {
  const sampleQueries = [
    "Show me temperature profiles in the North Atlantic",
    "Compare salinity data between Pacific and Atlantic",
    "Find BGC floats near the equator with oxygen data",
    "What are the latest measurements from Arctic floats?",
    "Analyze deep water formation in the Mediterranean"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-4">AI Ocean Data Explorer</h1>
          <p className="text-muted-foreground mb-6">
            Ask me anything about ARGO oceanographic data. I can help you find patterns, 
            create visualizations, and explore ocean measurements from around the world.
          </p>
        
          {/* Sample Queries */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm">Try asking:</h3>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((query, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-accent transition-colors"
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatWindow />
          </div>

          {/* Sample Visualizations */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="mb-4">Sample: Temperature Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.temperatureProfile}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="temperature" 
                      label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      dataKey="depth"
                      reversed
                      label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}°C`, 'Temperature']}
                      labelFormatter={(depth) => `Depth: ${depth}m`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Sample: Salinity Time Series</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.salinityTimeSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      domain={['dataMin - 0.2', 'dataMax + 0.2']}
                      label={{ value: 'Salinity (PSU)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value} PSU`, 'Salinity']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="salinity" 
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Floats:</span>
                  <span>3,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recent Profiles:</span>
                  <span>12,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BGC Measurements:</span>
                  <span>8,923</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regions Covered:</span>
                  <span>Global</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}