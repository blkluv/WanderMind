import React from 'react';
import TransportCardItem from './TransportCardItem';

function Transport({ trip }) {
  // Parse the tripData JSON string with error handling
  let tripData = {};
  
  try {
    if (trip?.tripData) {
      if (typeof trip.tripData === 'string') {
        tripData = JSON.parse(trip.tripData);
      } else {
        tripData = trip.tripData;
      }
    }
  } catch (error) {
    console.error("Error parsing trip data:", error);
  }

  // Generate budget-appropriate transport options
  const generateTransportOptions = (destination, budget, userBudgetAmount, days) => {
    const budgetRanges = {
      budget: { 
        options: [
          { type: 'Public Bus', priceRange: [1, 2], comfort: 'Basic' },
          { type: 'Shared Taxi', priceRange: [2, 5], comfort: 'Standard' },
          { type: 'Local Train', priceRange: [0.5, 1.5], comfort: 'Basic' }
        ]
      },
      moderate: { 
        options: [
          { type: 'AC Bus', priceRange: [2, 4], comfort: 'Comfortable' },
          { type: 'Private Taxi', priceRange: [10, 20], comfort: 'Premium' },
          { type: 'Train (AC)', priceRange: [3, 6], comfort: 'Comfortable' }
        ]
      },
      luxury: { 
        options: [
          { type: 'Private Car', priceRange: [25, 50], comfort: 'Luxury' },
          { type: 'Flight', priceRange: [40, 100], comfort: 'Premium' },
          { type: 'Luxury Bus', priceRange: [6, 15], comfort: 'Luxury' }
        ]
      }
    };

    // Adjust based on user budget if provided
    let selectedRange = budgetRanges[budget] || budgetRanges.moderate;
    if (userBudgetAmount && userBudgetAmount > 0) {
      const dailyBudget = userBudgetAmount / (days || 7);
      const transportBudget = dailyBudget * 0.15; // 15% for transport
      
      if (transportBudget < 4) {
        selectedRange = budgetRanges.budget;
      } else if (transportBudget < 10) {
        selectedRange = budgetRanges.moderate;
      } else {
        selectedRange = budgetRanges.luxury;
      }
    }

    return selectedRange.options.map((option, index) => {
      const basePrice = Math.floor(Math.random() * (option.priceRange[1] - option.priceRange[0]) + option.priceRange[0]);
      const duration = getTransportDuration(option.type);
      const availability = getAvailability(option.type);
      
      return {
        transportType: option.type,
        price: `$${basePrice.toLocaleString()}`,
        comfort: option.comfort,
        duration: duration,
        availability: availability,
        description: getTransportDescription(option.type, destination),
        features: getTransportFeatures(option.type, option.comfort),
        bookingUrl: `https://www.easemytrip.com/bus-booking/${destination?.toLowerCase().replace(/\s+/g, '-') || 'destination'}`,
        rating: (3.8 + Math.random() * 1.0).toFixed(1)
      };
    });
  };

  // Helper functions
  const getTransportDuration = (type) => {
    const durations = {
      'Public Bus': '4-6 hours',
      'Shared Taxi': '3-4 hours',
      'Local Train': '5-7 hours',
      'AC Bus': '4-5 hours',
      'Private Taxi': '3-4 hours',
      'Train (AC)': '4-6 hours',
      'Private Car': '3-4 hours',
      'Flight': '1-2 hours',
      'Luxury Bus': '4-5 hours'
    };
    return durations[type] || '4-5 hours';
  };

  const getAvailability = (type) => {
    const availability = {
      'Public Bus': 'Every 30 mins',
      'Shared Taxi': 'On demand',
      'Local Train': '4-6 daily',
      'AC Bus': 'Every hour',
      'Private Taxi': 'On demand',
      'Train (AC)': '2-4 daily',
      'Private Car': 'On demand',
      'Flight': '3-5 daily',
      'Luxury Bus': '2-3 daily'
    };
    return availability[type] || 'Available';
  };

  const getTransportDescription = (type, destination) => {
    const descriptions = {
      'Public Bus': `Economical bus service connecting major cities to ${destination || 'your destination'}`,
      'Shared Taxi': `Comfortable shared ride with other travelers to ${destination || 'your destination'}`,
      'Local Train': `Scenic train journey through beautiful landscapes to ${destination || 'your destination'}`,
      'AC Bus': `Air-conditioned comfortable bus with modern amenities`,
      'Private Taxi': `Private comfortable ride with professional driver`,
      'Train (AC)': `Air-conditioned train with comfortable seating and dining options`,
      'Private Car': `Luxury private car with chauffeur service`,
      'Flight': `Quick and convenient air travel to ${destination || 'your destination'}`,
      'Luxury Bus': `Premium bus service with luxury seating and entertainment`
    };
    return descriptions[type] || `Transportation to ${destination || 'your destination'}`;
  };

  const getTransportFeatures = (type, comfort) => {
    const featuresByType = {
      'Public Bus': ['Basic seating', 'Luggage space'],
      'Shared Taxi': ['Shared ride', 'Door pickup'],
      'Local Train': ['Scenic route', 'Onboard food'],
      'AC Bus': ['AC', 'Comfortable seats', 'Entertainment'],
      'Private Taxi': ['Private ride', 'Professional driver', 'Door-to-door'],
      'Train (AC)': ['AC', 'Meals included', 'Comfortable berths'],
      'Private Car': ['Luxury interior', 'Chauffeur', 'Flexible stops'],
      'Flight': ['Quick travel', 'In-flight service', 'Baggage included'],
      'Luxury Bus': ['Luxury seats', 'Entertainment', 'Refreshments']
    };
    return featuresByType[type] || ['Comfortable travel'];
  };

  const destination = trip?.userSelection?.location?.label || 'Destination';
  const budget = trip?.userSelection?.budget || 'moderate';
  const userBudgetAmount = trip?.userSelection?.budgetAmount || 0;
  const days = parseInt(trip?.userSelection?.noofDays) || 7;

  const transportOptions = generateTransportOptions(destination, budget, userBudgetAmount, days);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">🚗 Transportation Options</h2>
        <div className="px-3 py-1 text-sm text-gray-600 rounded-full dark:text-gray-300 bg-green-50 dark:bg-green-900/30">
          {transportOptions.length} options • {budget} budget
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {transportOptions.map((transport, index) => (
          <div key={index} className="relative">
            <TransportCardItem transport={transport} />
            {index === 0 && (
              <div className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded-full -top-2 -right-2">
                Best Value
              </div>
            )}
            {index === 1 && budget === 'moderate' && (
              <div className="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded-full -top-2 -right-2">
                Recommended
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          💡 <strong>Tip:</strong> Book transportation in advance for better rates. Consider travel time when planning your itinerary.
        </p>
      </div>
    </div>
  );
}

export default Transport;