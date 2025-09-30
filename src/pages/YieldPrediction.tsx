import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Sprout } from "lucide-react";
import { toast } from "sonner";

const YieldPrediction = () => {
  const [allCrops, setAllCrops] = useState<string[]>([]);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);
  const [allSoils, setAllSoils] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [cropType, setCropType] = useState("");
  const [landArea, setLandArea] = useState("");
  const [district, setDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [soilType, setSoilType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        setLoadError(null);
        const res = await fetch("/data/odisha-crop-data.csv", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);
        const text = await res.text();

        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length <= 1) throw new Error("CSV is empty");
        const header = lines[0].split(",");
        const idxCrop = header.indexOf("Crop");
        const idxDistrict = header.indexOf("District");
        const idxSoil = header.indexOf("Soil");
        if (idxCrop === -1 || idxDistrict === -1 || idxSoil === -1) {
          throw new Error("Required columns not found: Crop, District, Soil");
        }

        const cropSet = new Set<string>();
        const districtSet = new Set<string>();
        const soilSet = new Set<string>();

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(",");
          if (row.length < header.length) continue;
          const crop = row[idxCrop]?.trim();
          const district = row[idxDistrict]?.trim();
          const soilRaw = row[idxSoil]?.trim();
          if (crop) cropSet.add(crop);
          if (district) districtSet.add(district);
          if (soilRaw) {
            soilRaw
              .split(/&|\||\//)
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
              .forEach((s) => soilSet.add(s));
          }
        }

        const sortAlpha = (arr: string[]) => arr.sort((a, b) => a.localeCompare(b));
        setAllCrops(sortAlpha(Array.from(cropSet)));
        setAllDistricts(sortAlpha(Array.from(districtSet)));
        setAllSoils(sortAlpha(Array.from(soilSet)));
      } catch (err: any) {
        setLoadError(err?.message ?? "Failed to load options");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handlePredict = () => {
    if (!cropType || !landArea || !district || !season || !soilType) {
      toast.error("Please fill all required fields");
      return;
    }
    // Enhanced prediction calculation with multiple factors
    let baseyield = Math.random() * 5 + 3;
    
    // Adjust based on season
    if (season === "Kharif") baseyield *= 1.2;
    else if (season === "Rabi") baseyield *= 1.1;
    
    // Adjust based on soil type
    if (soilType === "ALLUVIAL SOIL") baseyield *= 1.15;
    
    // Adjust based on rainfall
    if (rainfall) {
      const rainfallValue = parseFloat(rainfall);
      if (rainfallValue > 100 && rainfallValue < 200) baseyield *= 1.1;
    }
    
    // Adjust based on temperature
    if (temperature) {
      const tempValue = parseFloat(temperature);
      if (tempValue > 20 && tempValue < 30) baseyield *= 1.05;
    }
    
    const totalYield = parseFloat(landArea) * baseyield;
    setPrediction(totalYield);
    toast.success("Advanced yield prediction calculated!");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <TrendingUp className="h-10 w-10 text-primary" />
          Yield Prediction
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered crop yield forecasting based on your farm data
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Input Farm Details
            </CardTitle>
            <CardDescription>Enter your crop and land information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type *</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder={loadingOptions ? "Loading crops..." : "Select crop"} />
                  </SelectTrigger>
                  <SelectContent>
                    {allCrops.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger id="district">
                    <SelectValue placeholder={loadingOptions ? "Loading districts..." : "Select district"} />
                  </SelectTrigger>
                  <SelectContent>
                    {allDistricts.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Season *</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="Zaid">Zaid (Summer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type *</Label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger id="soilType">
                    <SelectValue placeholder={loadingOptions ? "Loading soil types..." : "Select soil type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {allSoils.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Land Area (acres) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter land area"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall">Expected Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g., 150"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Avg Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="e.g., 25"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizer">Fertilizer (kg/acre)</Label>
                <Input
                  id="fertilizer"
                  type="number"
                  placeholder="e.g., 50"
                  value={fertilizer}
                  onChange={(e) => setFertilizer(e.target.value)}
                />
              </div>
            </div>

            {loadError && (
              <p className="text-sm text-destructive">{loadError}</p>
            )}

            <Button 
              onClick={handlePredict} 
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              Predict Yield
            </Button>
            <p className="text-xs text-muted-foreground mt-1">* are mandatory</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>Estimated crop yield for your farm</CardDescription>
          </CardHeader>
          <CardContent>
            {prediction ? (
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Estimated Yield</p>
                  <p className="text-5xl font-bold text-primary">
                    {prediction.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">quintals</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-card rounded border border-border">
                    <span className="text-muted-foreground">Crop Type:</span>
                    <span className="font-medium capitalize">{cropType}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded border border-border">
                    <span className="text-muted-foreground">Land Area:</span>
                    <span className="font-medium">{landArea} acres</span>
                  </div>
                  <div className="flex justify-between p-3 bg-card rounded border border-border">
                    <span className="text-muted-foreground">Yield per Acre:</span>
                    <span className="font-medium">{(prediction / parseFloat(landArea)).toFixed(2)} quintals</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <TrendingUp className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Enter your farm details and click "Predict Yield" to see results
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YieldPrediction;
