import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { domains, regions, parameters } from '../data/mockData';

interface FilterSidebarProps {
  selectedDomain: string;
  selectedRegion: string;
  selectedParameter: string;
  onDomainChange: (domain: string) => void;
  onRegionChange: (region: string) => void;
  onParameterChange: (parameter: string) => void;
}

export function FilterSidebar({
  selectedDomain,
  selectedRegion,
  selectedParameter,
  onDomainChange,
  onRegionChange,
  onParameterChange
}: FilterSidebarProps) {
  return (
    <Card className="p-4 h-fit sticky top-20">
      <h3 className="mb-4">Filters</h3>
      
      {/* Domain Filter */}
      <div className="mb-6">
        <h4 className="mb-2 text-sm text-muted-foreground">Domain</h4>
        <div className="space-y-2">
          <button
            onClick={() => onDomainChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedDomain === '' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          >
            All Domains
          </button>
          {domains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => onDomainChange(domain.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                selectedDomain === domain.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <span>{domain.name}</span>
              <Badge variant="secondary" className="text-xs">
                {domain.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Region Filter */}
      <div className="mb-6">
        <h4 className="mb-2 text-sm text-muted-foreground">Region</h4>
        <div className="space-y-2">
          <button
            onClick={() => onRegionChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedRegion === '' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => onRegionChange(region.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                selectedRegion === region.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <span>{region.name}</span>
              <Badge variant="secondary" className="text-xs">
                {region.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Parameter Filter */}
      <div>
        <h4 className="mb-2 text-sm text-muted-foreground">Parameter</h4>
        <div className="space-y-2">
          <button
            onClick={() => onParameterChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedParameter === '' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          >
            All Parameters
          </button>
          {parameters.map((parameter) => (
            <button
              key={parameter.id}
              onClick={() => onParameterChange(parameter.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                selectedParameter === parameter.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <span>{parameter.name}</span>
              <Badge variant="secondary" className="text-xs">
                {parameter.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}