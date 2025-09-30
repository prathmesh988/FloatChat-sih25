import React, { useState, useEffect } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { NotesSection } from '../components/NotesSection';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MessageSquare, StickyNote, Users, Clock } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
  isNew?: boolean;
}

export function PromptRoomPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Temperature profiles show interesting seasonal stratification patterns in the North Atlantic.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      author: 'Dr. Smith'
    },
    {
      id: '2', 
      content: 'BGC data from Arabian Sea floats indicates strong oxygen minimum zone at 400-800m depth.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      author: 'Research Team'
    },
    {
      id: '3',
      content: 'Southern Ocean carbon flux measurements align with climate model predictions for enhanced CO2 uptake.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      author: 'Prof. Johnson'
    }
  ]);

  // Simulate real-time collaborative updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a new collaborative note every 30-60 seconds
      if (Math.random() < 0.3) {
        const collaborativeNotes = [
          'Interesting correlation between salinity and temperature gradients observed.',
          'Float trajectory data suggests new current patterns in the Mediterranean.',
          'Chlorophyll spike detected near upwelling zones - possible phytoplankton bloom.',
          'Deep water formation event captured in real-time by multiple floats.',
          'pH measurements indicate ocean acidification acceleration in polar regions.'
        ];
        
        const randomNote = collaborativeNotes[Math.floor(Math.random() * collaborativeNotes.length)];
        const newNote: Note = {
          id: Date.now().toString(),
          content: randomNote,
          timestamp: new Date(),
          author: ['Dr. Martinez', 'Prof. Chen', 'Research Assistant'][Math.floor(Math.random() * 3)],
          isNew: true
        };
        
        setNotes(prev => [newNote, ...prev]);
        
        // Remove new flag after animation
        setTimeout(() => {
          setNotes(prev => prev.map(note => 
            note.id === newNote.id ? { ...note, isNew: false } : note
          ));
        }, 2000);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const addNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      author: 'You',
      isNew: true
    };
    
    setNotes(prev => [newNote, ...prev]);
    
    // Remove new flag after animation
    setTimeout(() => {
      setNotes(prev => prev.map(note => 
        note.id === newNote.id ? { ...note, isNew: false } : note
      ));
    }, 2000);
  };

  const editNote = (id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content, timestamp: new Date() } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4">Prompt Room</h1>
          <p className="text-muted-foreground mb-6">
            Collaborative space for AI-powered ARGO data exploration. Chat with the AI assistant and share 
            insights with your research team through real-time notes.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active Session</span>
              </div>
              <div className="text-xl font-medium">Live</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <StickyNote className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Team Notes</span>
              </div>
              <div className="text-xl font-medium">{notes.length}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Collaborators</span>
              </div>
              <div className="text-xl font-medium">4</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Session Time</span>
              </div>
              <div className="text-xl font-medium">1h 23m</div>
            </Card>
          </div>
        </div>

        {/* Split View Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 h-auto lg:h-[600px]">
          {/* Chat Section */}
          <div className="flex flex-col h-[500px] lg:h-full">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5" />
              <h2>AI Assistant Chat</h2>
              <Badge variant="secondary">FloatChat AI</Badge>
            </div>
            <div className="flex-1">
              <ChatWindow />
            </div>
          </div>

          {/* Notes Section */}
          <div className="flex flex-col h-[500px] lg:h-full">
            <div className="flex items-center gap-2 mb-4">
              <StickyNote className="h-5 w-5" />
              <h2>Team Notes</h2>
              <Badge variant="secondary">Real-time</Badge>
            </div>
            <div className="flex-1">
              <NotesSection 
                notes={notes}
                onAddNote={addNote}
                onEditNote={editNote}
                onDeleteNote={deleteNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}