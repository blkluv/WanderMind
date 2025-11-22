import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Calendar, MapPin } from 'lucide-react';

const BudgetValidator = ({ destination, days, travelers, budget, onSuggestionAccept }) => {
  const [validation, setValidation] = useState(null);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    if (destination && days && travelers && budget) {
      validateBudget();
    }
  }, [destination, days, travelers, budget]);

  const validateBudget = () => {
    const travelerCount = parseInt(travelers?.match(/\d+/)?.[0]) || 1;
    const totalDays = parseInt(days) || 1;
    const budgetAmount = parseInt(budget) || 0;

    const minimumBudgets = {
      'goa': 37,
      'mumbai': 43,
      'delhi': 37,
      'jaipur': 31,
      'kerala': 40,
      'manali': 43,
      'udaipur': 37,
      'agra': 31,
      'bangalore': 40,
      'hyderabad': 35,
      'pune': 35,
      'kolkata': 32,
      'chennai': 35,
      'default': 37
    };

    const destKey = destination.toLowerCase();
    const minPerDay = Object.keys(minimumBudgets).find(key => 
      destKey.includes(key)
    ) ? minimumBudgets[Object.keys(minimumBudgets).find(key => destKey.includes(key))] 
      : minimumBudgets.default;

    const minimumRequired = minPerDay * travelerCount * totalDays;
    const isValid = budgetAmount >= minimumRequired;

    if (!isValid) {
      const alts = [
        {
          type: 'shorter',
          title: 'Shorter Trip',
          description: `Try ${Math.floor(budgetAmount / (minPerDay * travelerCount))} days instead`,
          savings: minimumRequired - budgetAmount,
          icon: Calendar,
          action: () => onSuggestionAccept?.({ 
            type: 'days', 
            value: Math.floor(budgetAmount / (minPerDay * travelerCount)) 
          })
        },
        {
          type: 'cheaper',
          title: 'Budget-Friendly Destination',
          description: 'Consider Pondicherry, Rishikesh, or Hampi',
          savings: Math.round((minimumRequired - budgetAmount) * 0.6),
          icon: MapPin,
          action: () => onSuggestionAccept?.({ type: 'destination', value: 'alternative' })
        },
        {
          type: 'increase',
          title: 'Increase Budget',
          description: `Add $${(minimumRequired - budgetAmount).toLocaleString()} for comfortable trip`,
          savings: 0,
          icon: TrendingDown,
          action: () => onSuggestionAccept?.({ type: 'budget', value: minimumRequired })
        }
      ];
      setAlternatives(alts);
    }

    setValidation({
      isValid,
      minimumRequired,
      currentBudget: budgetAmount,
      shortfall: minimumRequired - budgetAmount
    });
  };

  if (!validation) return null;

  if (validation.isValid) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✅</div>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Budget Looks Good!
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your budget of ${validation.currentBudget.toLocaleString()} is sufficient for this trip
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-300 bg-orange-50 dark:bg-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
          <AlertTriangle className="w-5 h-5" />
          Budget Alert
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>{destination}</strong> typically needs a minimum of{' '}
            <strong className="text-orange-600">${validation.minimumRequired.toLocaleString()}</strong>{' '}
            for {days} days with {travelers}.
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            Your current budget: ${validation.currentBudget.toLocaleString()}{' '}
            (${validation.shortfall.toLocaleString()} short)
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
            💡 Smart Alternatives:
          </h4>
          <div className="space-y-2">
            {alternatives.map((alt, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start w-full h-auto p-4 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                onClick={alt.action}
              >
                <div className="flex items-start gap-3 text-left">
                  <alt.icon className="w-5 h-5 mt-1 text-orange-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {alt.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {alt.description}
                    </div>
                    {alt.savings > 0 && (
                      <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                        Save ${alt.savings.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetValidator;