import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, Droplets, Sun, TrendingUp, CheckCircle, XCircle } from "lucide-react";

const recommendations = [
  {
    crop: "Rice",
    season: "Kharif",
    waterReq: "High",
    duration: "120-150 days",
    yield: "40-50 quintals/acre",
    suitability: "Excellent",
    tips: "Best for monsoon season. Requires flooded fields. Recommended varieties: Swarna, MTU-1010",
  },
  {
    crop: "Maize",
    season: "Rabi",
    waterReq: "Medium",
    duration: "90-110 days",
    yield: "30-40 quintals/acre",
    suitability: "Good",
    tips: "Drought tolerant. Good for diversification. Recommended varieties: DHM-117, Hybrid-123",
  },
  {
    crop: "Pulses (Arhar)",
    season: "Kharif",
    waterReq: "Low",
    duration: "150-180 days",
    yield: "8-12 quintals/acre",
    suitability: "Very Good",
    tips: "Nitrogen-fixing crop. Improves soil health. Ideal for mixed cropping.",
  },
  {
    crop: "Vegetables",
    season: "All Season",
    waterReq: "Medium",
    duration: "60-90 days",
    yield: "80-120 quintals/acre",
    suitability: "Excellent",
    tips: "High market value. Requires regular care. Good for small landholdings.",
  },
  {
    crop: "Sugarcane",
    season: "Annual",
    waterReq: "High",
    duration: "12-18 months",
    yield: "300-400 quintals/acre",
    suitability: "Good",
    tips: "Long duration crop. Requires consistent irrigation. Good returns on investment.",
  },
  {
    crop: "Cotton",
    season: "Kharif",
    waterReq: "Medium",
    duration: "150-180 days",
    yield: "15-20 quintals/acre",
    suitability: "Good",
    tips: "Cash crop with good market. Monitor for pest control. Recommended for black soil.",
  },
];

const CropRecommendations = () => {
  const [temperature, setTemperature] = useState("25");
  const [district, setDistrict] = useState("");
  const [irrigation, setIrrigation] = useState("Available");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        setLoadingDistricts(true);
        setLoadError(null);
        const res = await fetch('/data/odisha-crop-data.csv', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);
        const text = await res.text();
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length <= 1) throw new Error('CSV is empty');
        const header = lines[0].split(',');
        const idxDistrict = header.indexOf('District');
        if (idxDistrict === -1) throw new Error('District column not found');
        const set = new Set<string>();
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',');
          if (row.length < header.length) continue;
          const d = row[idxDistrict]?.trim();
          if (d) set.add(d);
        }
        const list = Array.from(set).sort((a,b) => a.localeCompare(b));
        setAllDistricts(list);
      } catch (e: any) {
        setLoadError(e?.message ?? 'Failed to load districts');
      } finally {
        setLoadingDistricts(false);
      }
    };
    loadDistricts();
  }, []);

  const getSuitabilityColor = (crop: string, temp: number, irrig: string) => {
    // Logic for smart recommendations
    if (crop === "Rice" && temp >= 20 && temp <= 35 && irrig === "Available") return "bg-green-500/20 border-green-500";
    if (crop === "Maize" && temp >= 18 && temp <= 32 && irrig === "Medium") return "bg-green-500/20 border-green-500";
    if (crop === "Cotton" && temp > 35) return "bg-red-500/20 border-red-500";
    if (crop === "Sugarcane" && irrig === "Not Available") return "bg-red-500/20 border-red-500";
    return "bg-yellow-500/20 border-yellow-500";
  };

  const getRecommendationIcon = (crop: string, temp: number, irrig: string) => {
    const suitability = getSuitabilityColor(crop, temp, irrig);
    return suitability.includes("green") ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : suitability.includes("red") ? (
      <XCircle className="h-5 w-5 text-red-500" />
    ) : null;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Sprout className="h-10 w-10 text-green-500" />
          Smart Crop Recommendations
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered crop suggestions based on your location and current conditions
        </p>
      </div>

      <Card className="mb-8 border-border shadow-lg">
        <CardHeader>
          <CardTitle>Enter Your Conditions</CardTitle>
          <CardDescription>Get personalized crop recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Select value={temperature} onValueChange={setTemperature}>
                <SelectTrigger>
                  <SelectValue placeholder="Select temperature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15°C - Cool</SelectItem>
                  <SelectItem value="25">25°C - Moderate</SelectItem>
                  <SelectItem value="30">30°C - Warm</SelectItem>
                  <SelectItem value="35">35°C - Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingDistricts ? 'Loading districts...' : 'Select district'} />
                </SelectTrigger>
                <SelectContent>
                  {allDistricts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigation">Irrigation Availability</Label>
              <Select value={irrigation} onValueChange={setIrrigation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select irrigation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Not Available">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {loadError && (
            <p className="text-sm text-destructive mb-2">{loadError}</p>
          )}
          <Button 
            onClick={() => setShowRecommendations(true)} 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Get Smart Recommendations
          </Button>
        </CardContent>
      </Card>

      {showRecommendations && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, idx) => {
            const temp = parseInt(temperature);
            const cardClass = getSuitabilityColor(rec.crop, temp, irrigation);
            
            return (
              <Card 
                key={idx} 
                className={`border-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${cardClass}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-2xl text-foreground">{rec.crop}</CardTitle>
                        <CardDescription className="mt-1">Season: {rec.season}</CardDescription>
                      </div>
                      {getRecommendationIcon(rec.crop, temp, irrigation)}
                    </div>
                    <Badge
                      variant={
                        rec.suitability === "Excellent"
                          ? "default"
                          : rec.suitability === "Very Good"
                          ? "secondary"
                          : "outline"
                      }
                      className="shrink-0"
                    >
                      {rec.suitability}
                    </Badge>
                  </div>
                </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Water Need</p>
                    <p className="text-sm font-medium">{rec.waterReq}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{rec.duration}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Expected Yield</p>
                </div>
                <p className="text-lg font-bold text-primary">{rec.yield}</p>
              </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{rec.tips}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;
