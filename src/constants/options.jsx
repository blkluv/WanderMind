export const SelectTravelsList = [
  {
    id: 1,
    title: 'Solo Traveler',
    desc: 'A sole traveler in exploration',
    icon: '🪙',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: '🏠',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'An adventure to lifelong memories',
    icon: '🤝',
    people: '5 to 10 People',
  },
];

// Travel Persona Modes
export const TravelPersonas = [
  {
    id: 1,
    title: 'Heritage Explorer',
    desc: 'Discover historical sites, museums, and cultural landmarks worldwide',
    icon: '🏛️',
    keywords: 'heritage, history, museums, monuments, cultural sites, temples, castles'
  },
  {
    id: 2,
    title: 'Adventure Seeker',
    desc: 'Thrilling activities, trekking, and outdoor adventures across the globe',
    icon: '🏔️',
    keywords: 'adventure, trekking, hiking, rafting, paragliding, rock climbing, camping'
  },
  {
    id: 3,
    title: 'Luxury Nomad',
    desc: 'Premium experiences, fine dining, and luxury stays worldwide',
    icon: '💎',
    keywords: 'luxury, premium, fine dining, spa, resort, high-end shopping, exclusive'
  },
  {
    id: 4,
    title: 'Nightlife Enthusiast',
    desc: 'Bars, clubs, live music, and vibrant nightlife in global cities',
    icon: '🌃',
    keywords: 'nightlife, bars, clubs, live music, pubs, rooftop, party, entertainment'
  },
  {
    id: 5,
    title: 'Nature Lover',
    desc: 'Wildlife, national parks, and scenic landscapes around the world',
    icon: '🌿',
    keywords: 'nature, wildlife, national parks, forests, lakes, mountains, beaches'
  },
  {
    id: 6,
    title: 'Food Explorer',
    desc: 'Local cuisine, street food, and culinary experiences globally',
    icon: '🍜',
    keywords: 'food, cuisine, street food, local dishes, restaurants, cooking classes'
  }
];

// Travel Themes for enhanced planning
export const TravelThemes = [
  { id: 1, name: 'Heritage & Culture', icon: '🏛️' },
  { id: 2, name: 'Adventure & Sports', icon: '🏔️' },
  { id: 3, name: 'Relaxation & Wellness', icon: '🧘' },
  { id: 4, name: 'Nightlife & Entertainment', icon: '🌃' },
  { id: 5, name: 'Nature & Wildlife', icon: '🌿' },
  { id: 6, name: 'Food & Culinary', icon: '🍜' },
  { id: 7, name: 'Shopping & Markets', icon: '🛍️' },
  { id: 8, name: 'Photography & Scenic', icon: '📸' },
  { id: 9, name: 'Urban Exploration', icon: '🏙️' },
  { id: 10, name: 'Beach & Coastal', icon: '🏖️' }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget',
    desc: 'Cost-conscious travel with local experiences',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balanced comfort and value',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experiences without compromise',
    icon: '💎',
  },
];

export const AI_PROMPT = `
  Generate a comprehensive, personalized travel plan for destination: {location} for {totalDays} days.
  Traveler profile: {traveler}, Budget: {budget}, Travel persona: {persona}, Themes: {themes}
  User preferences: {userPreferences}
  
  Create an AI-powered, end-to-end itinerary with:
  - Dynamic route optimization for minimal travel time and maximum experience
  - Smart budget allocation across accommodation, transport, food, activities
  - Real-time adaptable recommendations for weather/delays
  - Hidden gems and authentic local experiences
  - Cultural heritage insights and multilingual support
  - Seamless booking integration readiness
  
  CRITICAL: Provide authentic local experiences and cultural insights specific to {location}.
  Consider local customs, peak seasons, visa requirements, and regional travel advisories.
  
  Return comprehensive JSON with booking-ready information:
  {
    "tripMetadata": {
      "tripId": "string",
      "destination": "string",
      "duration": "{totalDays} days",
      "totalBudget": "{budget}",
      "budgetCategory": "{budget}",
      "travelPersona": "{persona}",
      "themes": ["{themes}"],
      "generatedAt": "timestamp",
      "adaptiveScore": number,
      "bookingReadiness": boolean,
      "destinationType": "beach|city|mountain|countryside|island|desert"
    },
    "smartBudgetBreakdown": {
      "accommodation": {"amount": "string", "percentage": number, "bookingOptions": ["string"]},
      "transport": {"amount": "string", "percentage": number, "modes": ["string"]},
      "food": {"amount": "string", "percentage": number, "categories": ["string"]},
      "activities": {"amount": "string", "percentage": number, "experiences": ["string"]},
      "shopping": {"amount": "string", "percentage": number},
      "emergency": {"amount": "string", "percentage": number},
      "optimizationTips": ["string"]
    },
    "accommodationOptions": [
      {
        "hotelId": "string",
        "name": "string",
        "category": "budget|moderate|luxury",
        "address": "string",
        "pricePerNight": "string",
        "totalCost": "string",
        "rating": number,
        "amenities": ["string"],
        "geoCoordinates": {"lat": number, "lng": number},
        "imageUrl": "string",
        "bookingUrl": "string",
        "cancellationPolicy": "string",
        "nearbyAttractions": ["string"],
        "localTransport": ["string"]
      }
    ],
    "dynamicItinerary": [
      {
        "day": number,
        "date": "string",
        "theme": "string",
        "weatherConsideration": "string",
        "timeline": [
          {
            "time": "string",
            "activity": "string",
            "location": "string",
            "description": "string",
            "duration": "string",
            "cost": "string",
            "category": "heritage|adventure|culture|food|shopping|nature",
            "geoCoordinates": {"lat": number, "lng": number},
            "imageUrl": "string",
            "rating": number,
            "isHiddenGem": boolean,
            "bookingRequired": boolean,
            "bookingUrl": "string",
            "weatherDependent": boolean,
            "alternatives": ["string"],
            "localTips": ["string"],
            "culturalSignificance": "string"
          }
        ],
        "transportPlan": {
          "mode": "string",
          "cost": "string",
          "duration": "string",
          "bookingDetails": "string"
        },
        "mealRecommendations": [
          {
            "meal": "breakfast|lunch|dinner|snacks",
            "restaurant": "string",
            "cuisine": "string",
            "cost": "string",
            "location": "string",
            "speciality": "string"
          }
        ],
        "dayBudget": "string",
        "emergencyContacts": ["string"]
      }
    ],
    "hiddenGems": [
      {
        "name": "string",
        "type": "string",
        "description": "string",
        "location": "string",
        "bestTime": "string",
        "cost": "string",
        "localSecret": "string",
        "geoCoordinates": {"lat": number, "lng": number}
      }
    ],
    "culturalInsights": [
      {
        "aspect": "string",
        "description": "string",
        "dosDonts": ["string"],
        "localCustoms": ["string"],
        "languageTips": ["string"],
        "festivalInfo": "string"
      }
    ],
    "realTimeAdaptations": {
      "weatherAlternatives": [
        {
          "condition": "string",
          "alternatives": ["string"],
          "indoorOptions": ["string"]
        }
      ],
      "trafficOptimizations": ["string"],
      "lastMinuteDeals": ["string"],
      "emergencyPlans": ["string"]
    },
    "bookingSummary": {
      "totalCost": "string",
      "bookableItems": [
        {
          "type": "accommodation|transport|activity",
          "name": "string",
          "cost": "string",
          "bookingUrl": "string",
          "priority": "high|medium|low"
        }
      ],
      "paymentBreakdown": {
        "immediate": "string",
        "onArrival": "string",
        "flexible": "string"
      }
    },
    "shareableContent": {
      "title": "string",
      "summary": "string",
      "highlights": ["string"],
      "hashtags": ["string"],
      "qrCode": "string"
    }
  }
`;

// Conversational AI Prompt for chat refinements
export const CHAT_REFINEMENT_PROMPT = `
  You are a travel planning assistant. The user has an existing trip plan and wants to make changes.
  
  Current trip: {currentTrip}
  User request: {userMessage}
  
  Analyze the request and provide:
  1. Understanding of what they want to change
  2. Updated itinerary sections affected
  3. Budget impact
  4. Alternative suggestions
  
  Common requests:
  - "Add a day in [location]"
  - "Reduce budget to [amount]"
  - "Remove [activity/place]"
  - "Make it more [adventurous/relaxing/cultural]"
  - "Find cheaper alternatives"
  - "Add [specific activity/landmark]"
  
  Return JSON with the modifications needed.
`;

// Budget Predictor Prompt
export const BUDGET_PREDICTOR_PROMPT = `
  Predict the ideal budget for a trip to {destination} for {days} days with {travelers} travelers.
  
  Consider:
  - Destination cost of living and tourism prices
  - Accommodation costs (budget/moderate/luxury)
  - Food expenses (local/mid-range/fine dining)
  - Transportation (local transport, intercity, flights if applicable)
  - Activities and attractions
  - Shopping and miscellaneous
  - Seasonal price variations
  - Currency exchange rates
  
  Provide budget ranges in USD for different comfort levels with regional considerations.
`;