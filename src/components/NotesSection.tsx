import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Plus, Edit2, Trash2, Save, X, User, Clock, StickyNote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
  isNew?: boolean;
}

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (content: string) => void;
  onEditNote: (id: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesSection({ notes, onAddNote, onEditNote, onDeleteNote }: NotesSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      onAddNote(newNoteContent.trim());
      setNewNoteContent('');
      setIsAdding(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingId && editContent.trim()) {
      onEditNote(editingId, editContent.trim());
      setEditingId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getAuthorColor = (author: string) => {
    switch (author) {
      case 'You':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Dr. Smith':
      case 'Dr. Martinez':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Prof. Johnson':
      case 'Prof. Chen':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg">
      {/* Header with Add Button */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {notes.length} team notes
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            size="sm"
            className="gap-2"
            disabled={isAdding}
          >
            <Plus className="h-4 w-4" />
            Add Note
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Add Note Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="border-dashed border-2 border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <Textarea
                      placeholder="Share your insights about the ARGO data..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      className="min-h-[80px] resize-none"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddNote} size="sm" className="gap-2">
                        <Save className="h-3 w-3" />
                        Save Note
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsAdding(false);
                          setNewNoteContent('');
                        }} 
                        variant="outline" 
                        size="sm"
                        className="gap-2"
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes */}
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  boxShadow: note.isNew ? '0 0 20px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3,
                  ease: 'easeOut'
                }}
                className={`${note.isNew ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getAuthorColor(note.author)}>
                          <User className="h-3 w-3 mr-1" />
                          {note.author}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(note.timestamp)}
                        </div>
                      </div>
                      
                      {note.author === 'You' && editingId !== note.id && (
                        <div className="flex gap-1">
                          <Button
                            onClick={() => handleEditNote(note)}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => onDeleteNote(note.id)}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {editingId === note.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="min-h-[60px] resize-none"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveEdit} size="sm" className="gap-2">
                            <Save className="h-3 w-3" />
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" size="sm" className="gap-2">
                            <X className="h-3 w-3" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {notes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notes yet. Add your first research insight!</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}