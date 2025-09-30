import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const marketData = [
  {
    crop: "Rice",
    price: 2650,
    change: 5.2,
    trend: "up",
    market: "Bhubaneswar Mandi",
    demand: "High",
  },
  {
    crop: "Wheat",
    price: 2200,
    change: -2.3,
    trend: "down",
    market: "Cuttack Mandi",
    demand: "Medium",
  },
  {
    crop: "Maize",
    price: 1850,
    change: 3.8,
    trend: "up",
    market: "Sambalpur Mandi",
    demand: "High",
  },
  {
    crop: "Sugarcane",
    price: 3200,
    change: 1.5,
    trend: "up",
    market: "Balasore Mandi",
    demand: "Medium",
  },
  {
    crop: "Cotton",
    price: 5500,
    change: -1.2,
    trend: "down",
    market: "Berhampur Mandi",
    demand: "Low",
  },
  {
    crop: "Vegetables",
    price: 2800,
    change: 8.7,
    trend: "up",
    market: "Bhubaneswar Mandi",
    demand: "Very High",
  },
];

const MarketInsights = () => {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <DollarSign className="h-10 w-10 text-green-500" />
          Market Insights
        </h1>
        <p className="text-muted-foreground text-lg">
          Live market prices and demand trends for crops in Odisha
        </p>
      </div>

      <div className="grid gap-4">
        {marketData.map((item, idx) => (
          <Card key={idx} className="border-border shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="min-w-[120px]">
                    <h3 className="text-2xl font-bold text-foreground">{item.crop}</h3>
                    <p className="text-sm text-muted-foreground">{item.market}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ₹{item.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/quintal</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                    <span
                      className={`text-lg font-semibold ${
                        item.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.trend === "up" ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Market Demand</p>
                    <Badge
                      variant={
                        item.demand === "Very High" || item.demand === "High"
                          ? "default"
                          : item.demand === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.demand}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Price Alerts</CardTitle>
          <CardDescription>
            Get notified when crop prices reach your target
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Set up price alerts to know the best time to sell your produce and maximize profits.
          </p>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Setup Price Alerts
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketInsights;
