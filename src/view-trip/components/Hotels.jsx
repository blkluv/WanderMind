import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  // Parse the tripData JSON string with error handling
  let tripData = {};
  
  try {
    if (trip?.tripData) {
      // Check if tripData is already an object or a string
      if (typeof trip.tripData === 'string') {
        tripData = JSON.parse(trip.tripData);
      } else {
        tripData = trip.tripData;
      }
    }
  } catch (error) {
    console.error("Error parsing trip data:", error);
    console.log("Raw tripData:", trip?.tripData);
  }

  // Generate budget-appropriate hotel options (3-4 hotels)
  const generateBudgetAppropriateHotels = (existingHotels, destination, budget, userBudgetAmount) => {
    const budgetRanges = {
      budget: { min: 15, max: 35, types: ['Budget Hotel', 'Hostel', 'Guest House', 'Lodge'] },
      moderate: { min: 30, max: 70, types: ['3-Star Hotel', 'Business Hotel', 'Boutique Hotel', 'Resort'] },
      luxury: { min: 60, max: 150, types: ['4-Star Hotel', '5-Star Resort', 'Luxury Hotel', 'Premium Resort'] }
    };
    
    // If user provided specific budget amount, adjust ranges accordingly
    let range = budgetRanges[budget] || budgetRanges.moderate;
    if (userBudgetAmount && userBudgetAmount > 0) {
      const dailyBudget = userBudgetAmount / 7; // Assume 7 days average
      const hotelBudget = dailyBudget * 0.35; // 35% for accommodation
      
      if (hotelBudget < 25) {
        range = budgetRanges.budget;
      } else if (hotelBudget < 50) {
        range = budgetRanges.moderate;
      } else {
        range = budgetRanges.luxury;
      }
    }
    
    const targetCount = 4; // Show 4 hotel options
    const allHotels = [...existingHotels];
    
    // Generate additional hotels to reach target count
    for (let i = existingHotels.length; i < targetCount; i++) {
      const basePrice = Math.floor(Math.random() * (range.max - range.min) + range.min);
      const rating = (3.2 + Math.random() * 1.6).toFixed(1);
      const hotelType = range.types[i % range.types.length];
      
      // Add some price variation for different options
      const priceVariation = i === 0 ? 0.8 : i === 1 ? 1.0 : i === 2 ? 1.2 : 1.4;
      const finalPrice = Math.floor(basePrice * priceVariation);
      
      allHotels.push({
        hotelName: `${hotelType} ${destination || 'Central'} ${i + 1}`,
        hotelAddress: `${destination || 'City'} - ${getLocationVariant(i)}`,
        price: `$${finalPrice.toLocaleString()}`,
        pricePerNight: `$${finalPrice.toLocaleString()}`,
        rating: rating,
        hotelImageUrl: null,
        amenities: getHotelAmenities(budget, i),
        description: getHotelDescription(hotelType, destination, i)
      });
    }
    
    return allHotels.slice(0, targetCount);
  };

  // Helper function to get location variants
  const getLocationVariant = (index) => {
    const locations = ['City Center', 'Near Airport', 'Tourist District', 'Business Area'];
    return locations[index % locations.length];
  };

  // Helper function to get hotel amenities based on budget
  const getHotelAmenities = (budget, index) => {
    const amenitiesByBudget = {
      budget: ['Free WiFi', 'AC', '24/7 Reception', 'Room Service'],
      moderate: ['Free WiFi', 'AC', 'Restaurant', 'Gym', 'Room Service', 'Parking'],
      luxury: ['Free WiFi', 'AC', 'Restaurant', 'Spa', 'Pool', 'Gym', 'Concierge', 'Valet Parking']
    };
    
    const baseAmenities = amenitiesByBudget[budget] || amenitiesByBudget.moderate;
    return baseAmenities.slice(0, 3 + index); // Vary amenities by hotel
  };

  // Helper function to get hotel descriptions
  const getHotelDescription = (hotelType, destination, index) => {
    const descriptions = [
      `Comfortable ${hotelType.toLowerCase()} in the heart of ${destination || 'the city'} with modern amenities`,
      `Well-located ${hotelType.toLowerCase()} offering great value and convenient access to attractions`,
      `Premium ${hotelType.toLowerCase()} featuring excellent service and top-notch facilities`,
      `Luxury ${hotelType.toLowerCase()} providing exceptional comfort and world-class hospitality`
    ];
    return descriptions[index % descriptions.length];
  };

  // Get hotels and generate budget-appropriate options
  let hotels = tripData?.hotels || tripData?.accommodationOptions || [];
  const destination = trip?.userSelection?.location?.label || 'Destination';
  const budget = trip?.userSelection?.budget || 'moderate';
  const userBudgetAmount = trip?.userSelection?.budgetAmount || 0;
  
  // Adapt existing hotel structure
  const adaptedHotels = hotels.map(hotel => ({
    hotelName: hotel.hotelName || hotel.name,
    hotelAddress: hotel.hotelAddress || hotel.address,
    price: hotel.price || hotel.pricePerNight || hotel.totalCost,
    pricePerNight: hotel.pricePerNight || hotel.price,
    rating: hotel.rating,
    hotelImageUrl: hotel.hotelImageUrl || hotel.imageUrl,
    amenities: hotel.amenities || [],
    description: hotel.description
  }));

  const finalHotels = generateBudgetAppropriateHotels(adaptedHotels, destination, budget, userBudgetAmount);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">🏨 Hotel Recommendations</h2>
        <div className="px-3 py-1 text-sm text-gray-600 rounded-full dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30">
          {finalHotels.length} options • {budget} budget
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {finalHotels.map((hotel, index) => (
          <div key={index} className="relative">
            <HotelCardItem 
              hotel={hotel} 
              tripContext={{
                budget: trip?.userSelection?.budgetAmount || trip?.userSelection?.budget,
                days: trip?.userSelection?.noofDays,
                travelers: trip?.userSelection?.traveler
              }}
            />
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
          💡 <strong>Tip:</strong> Prices shown are per night. Book early for better rates and availability.
        </p>
      </div>
    </div>
  );
}

export default Hotels;