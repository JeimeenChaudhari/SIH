import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, TrendingUp, Droplets, Leaf, DollarSign } from "lucide-react";
import { toast } from "sonner";

const Optimization = () => {
  const [cropType, setCropType] = useState("");
  const [landArea, setLandArea] = useState("");
  const [waterAvailable, setWaterAvailable] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const handleOptimize = () => {
    if (!cropType || !landArea || !waterAvailable) {
      toast.error("Please fill all required fields");
      return;
    }

    // Simulated optimization calculation
    const area = parseFloat(landArea);
    const water = parseFloat(waterAvailable);
    const fertilizer = fertilizerCost ? parseFloat(fertilizerCost) : 0;
    const labor = laborCost ? parseFloat(laborCost) : 0;

    const waterEfficiency = (water / area).toFixed(2);
    const estimatedYield = (area * (Math.random() * 5 + 3)).toFixed(2);
    const totalCost = fertilizer + labor;
    const revenue = parseFloat(estimatedYield) * 2000; // Assuming 2000 per quintal
    const profit = revenue - totalCost;

    setOptimizationResult({
      waterEfficiency,
      estimatedYield,
      totalCost,
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      recommendations: [
        "Consider drip irrigation to save 30% water",
        "Apply organic fertilizer for better soil health",
        "Rotate crops to maintain soil nutrients",
        "Use weather-based irrigation scheduling"
      ]
    });

    toast.success("Optimization analysis completed!");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Gauge className="h-10 w-10 text-primary" />
          Farm Resource Optimization
        </h1>
        <p className="text-muted-foreground text-lg">
          Optimize your farm resources for maximum efficiency and profit
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Input Farm Resources
            </CardTitle>
            <CardDescription>Enter your available resources and costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landArea">Land Area (acres) *</Label>
              <Input
                id="landArea"
                type="number"
                placeholder="e.g., 5"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterAvailable">Water Available (cubic meters) *</Label>
              <Input
                id="waterAvailable"
                type="number"
                placeholder="e.g., 10000"
                value={waterAvailable}
                onChange={(e) => setWaterAvailable(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fertilizerCost">Fertilizer Cost (₹)</Label>
              <Input
                id="fertilizerCost"
                type="number"
                placeholder="e.g., 5000"
                value={fertilizerCost}
                onChange={(e) => setFertilizerCost(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="laborCost">Labor Cost (₹)</Label>
              <Input
                id="laborCost"
                type="number"
                placeholder="e.g., 15000"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleOptimize} 
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              Optimize Resources
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>Resource efficiency and profit analysis</CardDescription>
          </CardHeader>
          <CardContent>
            {optimizationResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <p className="text-sm text-muted-foreground">Water Efficiency</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {optimizationResult.waterEfficiency}
                    </p>
                    <p className="text-xs text-muted-foreground">m³ per acre</p>
                  </div>

                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <p className="text-sm text-muted-foreground">Est. Yield</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {optimizationResult.estimatedYield}
                    </p>
                    <p className="text-xs text-muted-foreground">quintals</p>
                  </div>

                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      ₹{optimizationResult.totalCost}
                    </p>
                  </div>

                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <p className="text-sm text-muted-foreground">Est. Profit</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{optimizationResult.profit}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                  <h3 className="font-semibold mb-3 text-primary">Optimization Recommendations</h3>
                  <ul className="space-y-2">
                    {optimizationResult.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <Gauge className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Enter your farm resources and click "Optimize Resources" to see analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Optimization;
