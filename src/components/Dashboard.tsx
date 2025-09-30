import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmerData } from "./FarmerInputDialog";
import { Sprout, Droplets, TrendingUp, CloudRain, ThermometerSun, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface DashboardProps {
  farmerData: FarmerData;
  language: 'en' | 'od' | 'hi';
}

const translations = {
  en: {
    title: "Your Crop Advisory Dashboard",
    subtitle: "Based on your farm details and AI analysis",
    farmDetails: "Farm Details",
    district: "District",
    crop: "Crop",
    season: "Season",
    area: "Area",
    yieldPrediction: "Predicted Yield",
    confidence: "Confidence Level",
    weatherAdvisory: "Weather Advisory",
    soilHealth: "Soil Health Recommendation",
    fertilizerPlan: "Fertilizer & Irrigation Plan",
    comparisonChart: "Yield Comparison",
    impactTracker: "Your Progress",
    predictedYield: "Predicted",
    averageYield: "District Avg",
    quintal: "Quintal/Hectare",
    improvement: "improvement vs last season",
    waterSaved: "water saved this season",
  },
  od: {
    title: "ଆପଣଙ୍କର ଫସଲ ପରାମର୍ଶ ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "ଆପଣଙ୍କର ଚାଷ ବିବରଣୀ ଏବଂ AI ବିଶ୍ଳେଷଣ ଉପରେ ଆଧାରିତ",
    farmDetails: "ଚାଷ ବିବରଣୀ",
    district: "ଜିଲ୍ଲା",
    crop: "ଫସଲ",
    season: "ଋତୁ",
    area: "କ୍ଷେତ୍ର",
    yieldPrediction: "ପୂର୍ବାନୁମାନିତ ଉତ୍ପାଦନ",
    confidence: "ବିଶ୍ୱାସ ସ୍ତର",
    weatherAdvisory: "ପାଗ ପରାମର୍ଶ",
    soilHealth: "ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ସୁପାରିଶ",
    fertilizerPlan: "ସାର ଏବଂ ସେଚନ ଯୋଜନା",
    comparisonChart: "ଉତ୍ପାଦନ ତୁଳନା",
    impactTracker: "ଆପଣଙ୍କର ପ୍ରଗତି",
    predictedYield: "ପୂର୍ବାନୁମାନିତ",
    averageYield: "ଜିଲ୍ଲା ହାରାହାରି",
    quintal: "କ୍ୱିଣ୍ଟାଲ/ହେକ୍ଟର",
    improvement: "ଗତ ଋତୁ ତୁଳନାରେ ଉନ୍ନତି",
    waterSaved: "ଏହି ଋତୁରେ ଜଳ ସଞ୍ଚୟ",
  }
};

// Mock prediction function based on CSV data patterns
function predictYield(data: FarmerData) {
  const baseYield = {
    "Rice": 28.5,
    "Arhar/Tur": 8.2,
    "Groundnut": 12.4,
    "Wheat": 22.1,
    "Maize": 24.3,
  };
  
  const crop = data.crop as keyof typeof baseYield;
  const base = baseYield[crop] || 15.0;
  
  // Adjust based on season
  const seasonMultiplier = data.season === "Kharif" ? 1.1 : data.season === "Rabi" ? 1.05 : 0.95;
  
  // Adjust based on soil pH (optimal range 6-7)
  const pH = parseFloat(data.soilPH);
  const pHMultiplier = pH >= 6 && pH <= 7 ? 1.15 : pH >= 5.5 && pH <= 7.5 ? 1.05 : 0.9;
  
  return (base * seasonMultiplier * pHMultiplier).toFixed(2);
}

function getWeatherAdvisory(season: string, language: 'en' | 'od' | 'hi') {
  const advisories = {
    en: {
      Kharif: "Monsoon season active. Moderate rainfall expected (120-150mm this week). Maintain proper drainage to prevent waterlogging.",
      Rabi: "Dry winter conditions. Temperature range 15-28°C. Irrigate every 7-10 days. Watch for frost in January.",
      Zaid: "Summer crop season. High temperatures expected (32-38°C). Increase irrigation frequency to 5-7 days.",
    },
    od: {
      Kharif: "ମୌସୁମୀ ଋତୁ ସକ୍ରିୟ। ମଧ୍ୟମ ବୃଷ୍ଟିପାତ ଆଶା କରାଯାଉଛି (ଏହି ସପ୍ତାହରେ 120-150mm)। ଜଳଜମା ରୋକିବା ପାଇଁ ଉପଯୁକ୍ତ ଜଳ ନିଷ୍କାସନ ବଜାୟ ରଖନ୍ତୁ।",
      Rabi: "ଶୁଷ୍କ ଶୀତ ପରିସ୍ଥିତି। ତାପମାତ୍ରା ପରିସର 15-28°C। ପ୍ରତି 7-10 ଦିନରେ ସେଚନ କରନ୍ତୁ। ଜାନୁଆରୀରେ ହିମ ପାଇଁ ସତର୍କ ରହନ୍ତୁ।",
      Zaid: "ଗ୍ରୀଷ୍ମ ଫସଲ ଋତୁ। ଉଚ୍ଚ ତାପମାତ୍ରା ଆଶା କରାଯାଉଛି (32-38°C)। ସେଚନ ଆବୃତ୍ତି 5-7 ଦିନକୁ ବୃଦ୍ଧି କରନ୍ତୁ।",
    },
    hi: {
      Kharif: "मानसून सीजन सक्रिय। मध्यम वर्षा की उम्मीद (इस सप्ताह 120-150mm)। जलभराव को रोकने के लिए उचित जल निकासी बनाए रखें।",
      Rabi: "शुष्क सर्दी की स्थिति। तापमान सीमा 15-28°C। हर 7-10 दिनों में सिंचाई करें। जनवरी में पाले के लिए सावधान रहें।",
      Zaid: "गर्मी की फसल का मौसम। उच्च तापमान की उम्मीद (32-38°C)। सिंचाई की आवृत्ति 5-7 दिनों तक बढ़ाएं।",
    }
  };
  return advisories[language][season as keyof typeof advisories.en] || advisories[language].Kharif;
}

function getSoilRecommendation(pH: string, soilType: string, language: 'en' | 'od' | 'hi') {
  const pHValue = parseFloat(pH);
  
  if (language === 'od') {
    if (pHValue < 6) return "ମାଟି ଅମ୍ଳୀୟ। ଚୂନ କମ୍ପୋଷ୍ଟ ଯୋଗ କରନ୍ତୁ (250kg/ହେକ୍ଟର)। ଜୈବିକ ସାର ବୃଦ୍ଧି କରନ୍ତୁ।";
    if (pHValue > 7.5) return "ମାଟି କ୍ଷାରୀୟ। ଜିପସମ୍ ପ୍ରୟୋଗ କରନ୍ତୁ (200kg/ହେକ୍ଟର)। ଗୋବର ସାର ଯୋଗ କରନ୍ତୁ।";
    return "ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ଉତ୍ତମ! pH ସନ୍ତୁଳିତ ଅଛି। ନିୟମିତ ଜୈବିକ ପଦାର୍ଥ ଯୋଗ ଜାରି ରଖନ୍ତୁ।";
  }
  
  if (language === 'hi') {
    if (pHValue < 6) return "मिट्टी अम्लीय है। चूना कम्पोस्ट जोड़ें (250kg/हेक्टेयर)। जैविक उर्वरक बढ़ाएं।";
    if (pHValue > 7.5) return "मिट्टी क्षारीय है। जिप्सम डालें (200kg/हेक्टेयर)। गोबर की खाद जोड़ें।";
    return "मिट्टी स्वास्थ्य उत्कृष्ट है! pH अच्छी तरह संतुलित है। नियमित जैविक पदार्थ जोड़ना जारी रखें।";
  }
  
  if (pHValue < 6) return "Soil is acidic. Add lime compost (250kg/hectare). Increase organic fertilizer application.";
  if (pHValue > 7.5) return "Soil is alkaline. Apply gypsum (200kg/hectare). Add farmyard manure to balance pH.";
  return "Soil health is excellent! pH is well balanced. Continue regular organic matter addition.";
}

function getFertilizerPlan(crop: string, season: string, language: 'en' | 'od' | 'hi') {
  const plans = {
    en: {
      Rice: "Week 1: Apply Urea 60kg/ha + DAP 50kg/ha. Week 4: Top dress with Urea 40kg/ha. Week 8: Apply Potash 30kg/ha.",
      default: "Week 1: Apply NPK (20:20:20) at 100kg/ha. Week 3: Top dress with Urea 40kg/ha. Irrigate every 7-10 days.",
    },
    od: {
      Rice: "ସପ୍ତାହ 1: ୟୁରିଆ 60kg/ହେକ୍ଟର + DAP 50kg/ହେକ୍ଟର ପ୍ରୟୋଗ କରନ୍ତୁ। ସପ୍ତାହ 4: ୟୁରିଆ 40kg/ହେକ୍ଟର ଟପ୍ ଡ୍ରେସ୍ କରନ୍ତୁ। ସପ୍ତାହ 8: ପୋଟାଶ୍ 30kg/ହେକ୍ଟର ପ୍ରୟୋଗ କରନ୍ତୁ।",
      default: "ସପ୍ତାହ 1: NPK (20:20:20) 100kg/ହେକ୍ଟର ପ୍ରୟୋଗ କରନ୍ତୁ। ସପ୍ତାହ 3: ୟୁରିଆ 40kg/ହେକ୍ଟର ଟପ୍ ଡ୍ରେସ୍ କରନ୍ତୁ। ପ୍ରତି 7-10 ଦିନରେ ସେଚନ କରନ୍ତୁ।",
    },
    hi: {
      Rice: "सप्ताह 1: यूरिया 60kg/हेक्टेयर + DAP 50kg/हेक्टेयर लगाएं। सप्ताह 4: यूरिया 40kg/हेक्टेयर से टॉप ड्रेस करें। सप्ताह 8: पोटाश 30kg/हेक्टेयर लगाएं।",
      default: "सप्ताह 1: NPK (20:20:20) 100kg/हेक्टेयर पर लगाएं। सप्ताह 3: यूरिया 40kg/हेक्टेयर से टॉप ड्रेस करें। हर 7-10 दिनों में सिंचाई करें।",
    }
  };
  return plans[language][crop as keyof typeof plans.en] || plans[language].default;
}

export function Dashboard({ farmerData, language }: DashboardProps) {
  const t = translations[language];
  const predictedYield = predictYield(farmerData);
  const districtAverage = (parseFloat(predictedYield) * 0.85).toFixed(2);
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-weather', {
          body: { location: farmerData.district || 'Bhubaneswar' }
        });
        
        if (error) throw error;
        setWeatherData(data.weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, [farmerData.district]);
  
  const chartData = [
    { name: t.predictedYield, value: parseFloat(predictedYield) },
    { name: t.averageYield, value: parseFloat(districtAverage) }
  ];

  const getWeatherDisplay = () => {
    if (loadingWeather) {
      return language === 'en' ? 'Loading weather data...' : 
             language === 'od' ? 'ପାଗ ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...' :
             'मौसम डेटा लोड हो रहा है...';
    }
    
    if (!weatherData) return getWeatherAdvisory(farmerData.season, language);
    
    const current = weatherData.current;
    const forecast = weatherData.forecast.forecastday[0];
    
    if (language === 'od') {
      return `ବର୍ତ୍ତମାନ: ${current.temp_c}°C, ${current.condition.text}. ବୃଷ୍ଟିର ସମ୍ଭାବନା: ${forecast.day.daily_chance_of_rain}%. ଆର୍ଦ୍ରତା: ${current.humidity}%. ${current.temp_c > 35 ? 'ସେଚନ ଆବୃତ୍ତି ବୃଦ୍ଧି କରନ୍ତୁ।' : current.temp_c < 15 ? 'ହିମ ପାଇଁ ସତର୍କ ରହନ୍ତୁ।' : 'ଫସଲ ପାଇଁ ଉପଯୁକ୍ତ ପରିସ୍ଥିତି।'}`;
    }
    
    return `Current: ${current.temp_c}°C, ${current.condition.text}. Rain chance: ${forecast.day.daily_chance_of_rain}%. Humidity: ${current.humidity}%. ${current.temp_c > 35 ? 'Increase irrigation frequency.' : current.temp_c < 15 ? 'Watch for frost damage.' : 'Favorable conditions for crops.'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Farm Details Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              {t.farmDetails}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Type:</span>
              <span className="font-medium capitalize">{farmerData.userType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.district}:</span>
              <span className="font-medium">{farmerData.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.crop}:</span>
              <span className="font-medium">{farmerData.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.season}:</span>
              <span className="font-medium">{farmerData.season}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.area}:</span>
              <span className="font-medium">{farmerData.area} ha</span>
            </div>
          </CardContent>
        </Card>

        {/* Yield Prediction - Hero Card */}
        <Card className="border-2 border-primary/20 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="w-6 h-6 text-primary" />
              {t.yieldPrediction}
            </CardTitle>
            <CardDescription>{farmerData.crop} - {farmerData.season}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  {predictedYield}
                </div>
                <div className="text-xl text-muted-foreground">{t.quintal}</div>
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{t.confidence}</span>
                  <span className="font-semibold">87%</span>
                </div>
                <Progress value={87} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {(((parseFloat(predictedYield) - parseFloat(districtAverage)) / parseFloat(districtAverage)) * 100).toFixed(1)}% 
                  {" "}{language === 'en' ? 'above district average' : 'ଜିଲ୍ଲା ହାରାହାରିରୁ ଅଧିକ'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advisory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Advisory */}
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-primary" />
                {t.weatherAdvisory}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{getWeatherDisplay()}</p>
              {weatherData && (
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">{language === 'en' ? 'Feels like' : 'ଅନୁଭବ'}: </span>
                    <span className="font-semibold">{weatherData.current.feelslike_c}°C</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{language === 'en' ? 'Wind' : 'ପବନ'}: </span>
                    <span className="font-semibold">{weatherData.current.wind_kph} km/h</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Soil Health */}
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-accent" />
                {t.soilHealth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{getSoilRecommendation(farmerData.soilPH, farmerData.soilType, language)}</p>
            </CardContent>
          </Card>

          {/* Fertilizer Plan */}
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-secondary" />
                {t.fertilizerPlan}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{getFertilizerPlan(farmerData.crop, farmerData.season, language)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t.comparisonChart}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: t.quintal, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact Tracker */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-secondary" />
              {t.impactTracker}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <span className="font-medium">+12%</span>
              <span className="text-sm text-muted-foreground">{t.improvement}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <span className="font-medium">2,400L</span>
              <span className="text-sm text-muted-foreground">{t.waterSaved}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
