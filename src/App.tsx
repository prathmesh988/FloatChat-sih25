import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FeedPage } from './pages/FeedPage';
import { ChatPage } from './pages/ChatPage';
import { PromptRoomPage } from './pages/PromptRoomPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ExplorePage } from './pages/ExplorePage';
import { Toaster } from './components/ui/sonner';
import Swippable from './pages/Swippable';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/prompt-room" element={<PromptRoomPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}