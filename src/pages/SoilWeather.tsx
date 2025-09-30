import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, Droplets, Wind, Sun, MapPin, ThermometerSun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const districts = [
  "Anugul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", 
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", 
  "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
  "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"
];

const SoilWeather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const fetchWeatherData = async (district: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: { location: `${district}, Odisha` }
      });

      if (error) throw error;
      
      // The edge function returns { weather: ... }
      setWeatherData((data as any)?.weather ?? data);
      toast.success(`Weather data loaded for ${district}`);
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast.error("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeather = () => {
    if (!selectedDistrict) {
      toast.error("Please select a district");
      return;
    }
    fetchWeatherData(selectedDistrict);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Cloud className="h-10 w-10 text-blue-500" />
          Soil & Weather Monitoring
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time weather data and soil recommendations for your region
        </p>
      </div>

      <Card className="mb-6 border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Select Your Location
          </CardTitle>
          <CardDescription>Choose your district to get localized weather data</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="district">District</Label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleFetchWeather} 
            className="mt-6 bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Weather Data"}
          </Button>
        </CardContent>
      </Card>

      {weatherData && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4 text-orange-500" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {weatherData.current?.temp_c || weatherData.temperature}°C
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Feels like {weatherData.current?.feelslike_c || weatherData.temperature}°C
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {weatherData.current?.humidity || weatherData.humidity}%
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-gray-500" />
                  Precipitation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {weatherData.current?.precip_mm || weatherData.rainfall || 0}mm
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Wind className="h-4 w-4 text-cyan-500" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {weatherData.current?.wind_kph || weatherData.windSpeed} km/h
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Soil Recommendations</CardTitle>
                <CardDescription>Based on {selectedDistrict} conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Optimal pH Range</h3>
                  <p className="text-2xl font-bold text-primary">6.0 - 7.5</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ideal for most crops in Odisha
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Recommendations:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Apply organic manure before monsoon</li>
                    <li>Ensure proper drainage in low-lying areas</li>
                    <li>Consider soil testing for accurate fertilizer application</li>
                    <li>Maintain crop rotation for soil health</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle>Weather Advisory</CardTitle>
                <CardDescription>Farming recommendations for {selectedDistrict}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-medium mb-2 text-primary">Current Advice</h3>
                  <p className="text-sm leading-relaxed">
                    {weatherData.current?.condition?.text || "Clear conditions"}. Temperature is {weatherData.current?.temp_c}°C with {weatherData.current?.humidity}% humidity. 
                    {weatherData.current?.temp_c > 30 ? " High temperature - ensure adequate irrigation." : " Favorable conditions for crop growth."}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Action Items:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Check irrigation systems</li>
                    <li>Monitor for common pests</li>
                    <li>Plan fertilizer application</li>
                    <li>Prepare for seasonal changes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!weatherData && !loading && (
        <Card className="border-border shadow-lg">
          <CardContent className="py-12 text-center">
            <Sun className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Select a district and click "Get Weather Data" to view detailed weather information
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SoilWeather;
