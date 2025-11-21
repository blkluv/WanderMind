import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Mic, 
  MicOff,
  Languages,
  BookOpen,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

const MultilingualSupport = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [translations, setTranslations] = useState({});

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' }
  ];

  const commonPhrases = {
    en: {
      greeting: "Hello! How can I help you plan your trip?",
      directions: "Where would you like to go?",
      food: "What type of food would you like to try?",
      emergency: "Emergency contacts and important numbers",
      thank_you: "Thank you for using IRL.TRAVEL!",
      help: "Need help? Ask me anything about your trip."
    },
    hi: {
      greeting: "नमस्ते! मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूं?",
      directions: "आप कहाँ जाना चाहते हैं?",
      food: "आप किस प्रकार का खाना आज़माना चाहते हैं?",
      emergency: "आपातकालीन संपर्क और महत्वपूर्ण नंबर",
      thank_you: "IRL.TRAVEL का उपयोग करने के लिए धन्यवाद!",
      help: "मदद चाहिए? अपनी यात्रा के बारे में मुझसे कुछ भी पूछें।"
    },
    bn: {
      greeting: "হ্যালো! আমি কীভাবে আপনার ভ্রমণ পরিকল্পনায় সাহায্য করতে পারি?",
      directions: "আপনি কোথায় যেতে চান?",
      food: "আপনি কী ধরনের খাবার চেষ্টা করতে চান?",
      emergency: "জরুরি যোগাযোগ এবং গুরুত্বপূর্ণ নম্বর",
      thank_you: "IRL.TRAVEL ব্যবহার করার জন্য ধন্যবাদ!",
      help: "সাহায্য দরকার? আপনার ভ্রমণ সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন।"
    }
  };

  const travelPhrases = {
    en: [
      { phrase: "How much does this cost?", category: "Shopping" },
      { phrase: "Where is the nearest ATM?", category: "Banking" },
      { phrase: "Can you help me with directions?", category: "Navigation" },
      { phrase: "What time does this close?", category: "General" },
      { phrase: "Do you speak English?", category: "Communication" },
      { phrase: "I need a doctor", category: "Emergency" },
      { phrase: "Where is the bathroom?", category: "General" },
      { phrase: "Can I have the menu, please?", category: "Food" }
    ],
    hi: [
      { phrase: "इसकी कीमत कितनी है?", category: "खरीदारी" },
      { phrase: "सबसे नजदीकी ATM कहाँ है?", category: "बैंकिंग" },
      { phrase: "क्या आप दिशा बताने में मदद कर सकते हैं?", category: "दिशा" },
      { phrase: "यह कितने बजे बंद होता है?", category: "सामान्य" },
      { phrase: "क्या आप अंग्रेजी बोलते हैं?", category: "संवाद" },
      { phrase: "मुझे डॉक्टर की जरूरत है", category: "आपातकाल" },
      { phrase: "बाथरूम कहाँ है?", category: "सामान्य" },
      { phrase: "क्या मुझे मेन्यू मिल सकता है?", category: "खाना" }
    ]
  };

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceEnabled(true);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    toast.success(`Language changed to ${supportedLanguages.find(l => l.code === languageCode)?.name}`);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const startVoiceRecognition = () => {
    if (!isVoiceEnabled) {
      toast.error('Voice recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      toast.success(`Voice input: ${transcript}`);
    };

    recognition.onerror = () => {
      toast.error('Voice recognition failed');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const getCurrentLanguageData = () => {
    return supportedLanguages.find(lang => lang.code === selectedLanguage) || supportedLanguages[0];
  };

  const getCurrentPhrases = () => {
    return commonPhrases[selectedLanguage] || commonPhrases.en;
  };

  const getCurrentTravelPhrases = () => {
    return travelPhrases[selectedLanguage] || travelPhrases.en;
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Multilingual Travel Assistant
          </CardTitle>
          <p className="text-sm text-gray-600">
            Choose your preferred language for personalized travel assistance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {supportedLanguages.map((language) => (
              <Button
                key={language.code}
                variant={selectedLanguage === language.code ? "default" : "outline"}
                onClick={() => handleLanguageChange(language.code)}
                className="flex flex-col items-center h-auto p-3"
              >
                <span className="mb-1 text-2xl">{language.flag}</span>
                <span className="text-xs font-medium">{language.nativeName}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{language.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            Voice Travel Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={startVoiceRecognition}
              disabled={!isVoiceEnabled || isListening}
              className="flex items-center gap-2"
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Voice Input
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speakText(getCurrentPhrases().greeting)}
              className="flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Test Voice Output
            </Button>
          </div>

          {voiceInput && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Voice Input Detected:</p>
              <p className="text-blue-700 dark:text-blue-300">{voiceInput}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(getCurrentPhrases()).map(([key, phrase]) => (
              <div
                key={key}
                className="p-3 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                onClick={() => speakText(phrase)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{phrase}</span>
                  <Volume2 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Essential Travel Phrases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            Essential Travel Phrases
          </CardTitle>
          <p className="text-sm text-gray-600">
            Common phrases you might need during your trip in {getCurrentLanguageData().nativeName}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              getCurrentTravelPhrases().reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item.phrase);
                return acc;
              }, {})
            ).map(([category, phrases]) => (
              <div key={category}>
                <h4 className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Badge variant="secondary">{category}</Badge>
                </h4>
                <div className="grid gap-2">
                  {phrases.map((phrase, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 transition-colors rounded cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => speakText(phrase)}
                    >
                      <span className="text-sm">{phrase}</span>
                      <Volume2 className="w-3 h-3 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            Regional Travel Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <h4 className="mb-1 font-medium text-yellow-800">Language Tips for {getCurrentLanguageData().name}</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Most locals in tourist areas understand basic English</li>
                <li>• Learning a few local phrases shows respect and often gets better service</li>
                <li>• Use translation apps for complex conversations</li>
                <li>• Carry a phrasebook or use offline translation features</li>
              </ul>
            </div>

            <div className="p-3 border border-green-200 rounded-lg bg-green-50">
              <h4 className="mb-1 font-medium text-green-800">Cultural Etiquette</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Greet with "Namaste" (hands together) in most Indian regions</li>
                <li>• Remove shoes when entering homes or religious places</li>
                <li>• Use right hand for eating and greeting</li>
                <li>• Dress modestly, especially at religious sites</li>
              </ul>
            </div>

            <div className="p-3 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
              <h4 className="mb-1 font-medium text-blue-800 dark:text-blue-200">Emergency Phrases</h4>
              <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-center justify-between">
                  <span>Help: मदद (Madad)</span>
                  <Volume2 className="w-3 h-3 cursor-pointer" onClick={() => speakText('मदद')} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Police: पुलिस (Police)</span>
                  <Volume2 className="w-3 h-3 cursor-pointer" onClick={() => speakText('पुलिस')} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Hospital: अस्पताल (Aspatal)</span>
                  <Volume2 className="w-3 h-3 cursor-pointer" onClick={() => speakText('अस्पताल')} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultilingualSupport;