// Mock data for FloatChat ARGO oceanographic application

export const argoFloats = [
  {
    id: "argo_001",
    title: "North Atlantic Temperature Profiles",
    description: "Deep ocean temperature measurements from float WMO 6901234 showing seasonal variations in the Labrador Sea.",
    region: "North Atlantic",
    parameter: "Temperature",
    domain: "Physical Oceanography",
    tags: ["temperature", "deep-ocean", "seasonal", "labrador-sea"],
    lastUpdate: "2024-03-15",
    depth: "0-2000m",
    likes: 24,
    saves: 8,
    floatId: "WMO 6901234",
    coordinates: { lat: 58.5, lon: -52.3 },
    dataPoints: 1250,
    status: "Active"
  },
  {
    id: "argo_002", 
    title: "Arabian Sea Salinity Anomalies",
    description: "BGC sensor data revealing unusual salinity patterns during monsoon season, potentially linked to freshwater influx.",
    region: "Arabian Sea",
    parameter: "Salinity",
    domain: "Biogeochemical",
    tags: ["salinity", "bgc", "monsoon", "anomaly"],
    lastUpdate: "2024-03-12",
    depth: "0-1500m",
    likes: 31,
    saves: 12,
    floatId: "WMO 6901567",
    coordinates: { lat: 18.2, lon: 65.8 },
    dataPoints: 980,
    status: "Active"
  },
  {
    id: "argo_003",
    title: "Equatorial Pacific Oxygen Levels",
    description: "Critical oxygen measurements showing potential dead zone expansion along the equatorial Pacific upwelling region.",
    region: "Equatorial Pacific",
    parameter: "Oxygen",
    domain: "Biogeochemical",
    tags: ["oxygen", "dead-zone", "upwelling", "climate"],
    lastUpdate: "2024-03-10",
    depth: "100-1000m",
    likes: 45,
    saves: 18,
    floatId: "WMO 6901890",
    coordinates: { lat: 0.5, lon: -140.2 },
    dataPoints: 750,
    status: "Active"
  },
  {
    id: "argo_004",
    title: "Southern Ocean Carbon Flux",
    description: "Biogeochemical float tracking carbon absorption patterns in the Southern Ocean's role as a global carbon sink.",
    region: "Southern Ocean",
    parameter: "Carbon",
    domain: "Biogeochemical", 
    tags: ["carbon", "climate", "absorption", "sink"],
    lastUpdate: "2024-03-08",
    depth: "0-2000m",
    likes: 38,
    saves: 15,
    floatId: "WMO 6902123",
    coordinates: { lat: -55.7, lon: 45.1 },
    dataPoints: 1100,
    status: "Active"
  },
  {
    id: "argo_005",
    title: "Mediterranean Deep Water Formation",
    description: "Temperature and salinity profiles capturing deep water formation processes in the Gulf of Lion during winter.",
    region: "Mediterranean",
    parameter: "Temperature",
    domain: "Physical Oceanography",
    tags: ["deep-water", "formation", "winter", "mediterranean"],
    lastUpdate: "2024-03-05",
    depth: "0-2500m",
    likes: 27,
    saves: 9,
    floatId: "WMO 6901345",
    coordinates: { lat: 42.1, lon: 5.2 },
    dataPoints: 890,
    status: "Active"
  },
  {
    id: "argo_006",
    title: "Arctic Ocean Ice-Edge Dynamics", 
    description: "Unique measurements from ice-capable floats showing temperature stratification under Arctic sea ice.",
    region: "Arctic Ocean",
    parameter: "Temperature",
    domain: "Physical Oceanography",
    tags: ["arctic", "ice-edge", "stratification", "sea-ice"],
    lastUpdate: "2024-03-02",
    depth: "0-500m",
    likes: 52,
    saves: 22,
    floatId: "WMO 6902456",
    coordinates: { lat: 78.9, lon: -15.4 },
    dataPoints: 425,
    status: "Active"
  }
];

export const promptHistory = [
  {
    id: "prompt_001",
    query: "Show me salinity profiles near the equator in March 2023",
    timestamp: "2024-03-15T10:30:00Z",
    response: "Found 12 ARGO floats with salinity data near the equatorial Pacific. Notable freshwater lens detected at 10-50m depth.",
    floatsUsed: ["WMO 6901234", "WMO 6901567"],
    visualizations: ["depth-profile", "time-series"],
    likes: 8,
    domain: "Physical Oceanography"
  },
  {
    id: "prompt_002", 
    query: "Compare BGC parameters in the Arabian Sea last 6 months",
    timestamp: "2024-03-12T14:15:00Z",
    response: "Oxygen minimum zone intensified by 15% compared to historical average. Chlorophyll peaks align with monsoon patterns.",
    floatsUsed: ["WMO 6901567", "WMO 6901890"],
    visualizations: ["comparison-chart", "geographic-map"],
    likes: 12,
    domain: "Biogeochemical"
  },
  {
    id: "prompt_003",
    query: "Nearest ARGO floats to 45°N, 30°W with temperature data",
    timestamp: "2024-03-10T09:45:00Z", 
    response: "3 active floats within 200km radius. Float WMO 6902123 shows interesting warm water intrusion at 300m depth.",
    floatsUsed: ["WMO 6902123", "WMO 6901345"],
    visualizations: ["location-map", "depth-profile"],
    likes: 5,
    domain: "Physical Oceanography"
  },
  {
    id: "prompt_004",
    query: "Deep water formation events in the Mediterranean this winter",
    timestamp: "2024-03-08T16:20:00Z",
    response: "Strong convection detected in Gulf of Lion. Mixed layer depth reached 1800m, deepest in 5 years.",
    floatsUsed: ["WMO 6901345"],
    visualizations: ["time-series", "depth-profile"],
    likes: 15,
    domain: "Physical Oceanography"
  },
  {
    id: "prompt_005",
    query: "Carbon flux anomalies in Southern Ocean upwelling zones",
    timestamp: "2024-03-05T11:00:00Z",
    response: "Enhanced carbon uptake detected near 50°S. Correlated with increased phytoplankton activity during austral summer.",
    floatsUsed: ["WMO 6902123", "WMO 6902456"],
    visualizations: ["geographic-map", "time-series"],
    likes: 20,
    domain: "Biogeochemical"
  }
];

export const domains = [
  { id: "physical", name: "Physical Oceanography", count: 45 },
  { id: "biogeochemical", name: "Biogeochemical", count: 32 },
  { id: "climate", name: "Climate Studies", count: 28 },
  { id: "ecosystem", name: "Marine Ecosystem", count: 19 }
];

export const regions = [
  { id: "north-atlantic", name: "North Atlantic", count: 12 },
  { id: "pacific", name: "Pacific Ocean", count: 18 },
  { id: "southern-ocean", name: "Southern Ocean", count: 8 },
  { id: "arctic", name: "Arctic Ocean", count: 6 },
  { id: "mediterranean", name: "Mediterranean Sea", count: 5 },
  { id: "arabian-sea", name: "Arabian Sea", count: 7 }
];

export const parameters = [
  { id: "temperature", name: "Temperature", count: 25 },
  { id: "salinity", name: "Salinity", count: 22 },
  { id: "oxygen", name: "Oxygen", count: 15 },
  { id: "carbon", name: "Carbon", count: 12 },
  { id: "chlorophyll", name: "Chlorophyll", count: 10 },
  { id: "ph", name: "pH", count: 8 }
];

export const roadmapData = [
  {
    id: "beginner",
    title: "Ocean Basics",
    description: "Start with fundamental oceanographic concepts",
    level: "Beginner",
    steps: [
      "What is temperature stratification?",
      "How do ARGO floats work?", 
      "Understanding salinity measurements",
      "Basic ocean current patterns"
    ],
    estimatedTime: "30 minutes",
    floatsUsed: 3
  },
  {
    id: "intermediate", 
    title: "Regional Analysis",
    description: "Explore specific ocean regions and their characteristics",
    level: "Intermediate",
    steps: [
      "Compare Atlantic vs Pacific profiles",
      "Seasonal variations in the Mediterranean",
      "Upwelling zone identification",
      "Deep water mass formation"
    ],
    estimatedTime: "45 minutes", 
    floatsUsed: 8
  },
  {
    id: "advanced",
    title: "Climate Research",
    description: "Advanced analysis for climate and ecosystem studies",
    level: "Advanced", 
    steps: [
      "Carbon cycle analysis",
      "Ocean acidification trends",
      "Marine heatwave detection",
      "Ecosystem response modeling"
    ],
    estimatedTime: "60 minutes",
    floatsUsed: 15
  }
];

export const chartData = {
  temperatureProfile: [
    { depth: 0, temperature: 25.2 },
    { depth: 50, temperature: 22.8 },
    { depth: 100, temperature: 18.5 },
    { depth: 200, temperature: 12.3 },
    { depth: 500, temperature: 8.1 },
    { depth: 1000, temperature: 4.2 },
    { depth: 1500, temperature: 3.1 },
    { depth: 2000, temperature: 2.5 }
  ],
  salinityTimeSeries: [
    { date: "2024-01", salinity: 34.5 },
    { date: "2024-02", salinity: 34.7 },
    { date: "2024-03", salinity: 34.3 },
    { date: "2024-04", salinity: 34.8 },
    { date: "2024-05", salinity: 34.6 },
    { date: "2024-06", salinity: 34.9 }
  ]
};

// Enhanced mock data for better AI responses
export const enhancedFloatData = [
  {
    id: "WMO 6901234",
    region: "North Atlantic",
    lat: 58.5,
    lon: -52.3,
    status: "Active",
    lastProfile: "2024-03-15",
    totalProfiles: 245,
    parameters: ["temperature", "salinity", "pressure"],
    depthRange: "0-2000m"
  },
  {
    id: "WMO 6901567", 
    region: "Arabian Sea",
    lat: 18.2,
    lon: 65.8,
    status: "Active",
    lastProfile: "2024-03-12",
    totalProfiles: 198,
    parameters: ["temperature", "salinity", "pressure", "oxygen", "nitrate", "ph"],
    depthRange: "0-1500m"
  },
  {
    id: "WMO 6901890",
    region: "Equatorial Pacific", 
    lat: 0.5,
    lon: -140.2,
    status: "Active",
    lastProfile: "2024-03-10",
    totalProfiles: 152,
    parameters: ["temperature", "salinity", "pressure", "oxygen", "chlorophyll"],
    depthRange: "100-1000m"
  },
  {
    id: "WMO 6902123",
    region: "Southern Ocean",
    lat: -55.7,
    lon: 45.1, 
    status: "Active",
    lastProfile: "2024-03-08",
    totalProfiles: 89,
    parameters: ["temperature", "salinity", "pressure", "oxygen", "carbon", "ph"],
    depthRange: "0-2000m"
  },
  {
    id: "WMO 6902456",
    region: "Arctic Ocean",
    lat: 78.9,
    lon: -15.4,
    status: "Active", 
    lastProfile: "2024-03-02",
    totalProfiles: 67,
    parameters: ["temperature", "salinity", "pressure"],
    depthRange: "0-500m"
  }
];