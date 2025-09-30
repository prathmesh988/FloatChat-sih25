import React, { useState, useMemo } from 'react';
import { FeedCard } from '../components/FeedCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Star } from 'lucide-react';
import { argoFloats } from '../data/mockData';
import { getUserPreferences, getPersonalizedScore } from '../utils/preferences';

export function FeedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('');

  const filteredFloats = useMemo(() => {
    const userPrefs = getUserPreferences();
    const hasPreferences = userPrefs.interests.length > 0 || userPrefs.domains.length > 0;
    
    return argoFloats
      .filter(float => {
        const matchesSearch = searchQuery === '' || 
          float.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          float.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          float.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDomain = selectedDomain === '' || 
          float.domain.toLowerCase().includes(selectedDomain.toLowerCase());

        const matchesRegion = selectedRegion === '' || 
          float.region.toLowerCase().replace(/\s+/g, '-') === selectedRegion;

        const matchesParameter = selectedParameter === '' || 
          float.parameter.toLowerCase() === selectedParameter;

        return matchesSearch && matchesDomain && matchesRegion && matchesParameter;
      })
      .map(float => ({
        ...float,
        personalizedScore: hasPreferences ? getPersonalizedScore(float) : 0,
        isPersonalized: hasPreferences && getPersonalizedScore(float) > 0
      }))
      .sort((a, b) => {
        // Sort by personalized score first, then by likes
        if (a.personalizedScore !== b.personalizedScore) {
          return b.personalizedScore - a.personalizedScore;
        }
        return b.likes - a.likes;
      });
  }, [searchQuery, selectedDomain, selectedRegion, selectedParameter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="mb-4">ARGO Ocean Data Feed</h1>
          <p className="text-muted-foreground mb-6">
            Discover and explore oceanographic data from ARGO floats worldwide. 
            Filter by domain, region, and parameters to find the data that interests you most.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search floats, regions, parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar
              selectedDomain={selectedDomain}
              selectedRegion={selectedRegion}
              selectedParameter={selectedParameter}
              onDomainChange={setSelectedDomain}
              onRegionChange={setSelectedRegion}
              onParameterChange={setSelectedParameter}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {filteredFloats.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No floats found matching your criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredFloats.length} of {argoFloats.length} floats
                </div>
                <div className="grid gap-6">
                  {filteredFloats.map((float) => (
                    <FeedCard key={float.id} float={float} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}