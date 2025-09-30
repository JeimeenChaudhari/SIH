import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import cropPrediction from "@/assets/crop-prediction.jpg";
import odishaFarming from "@/assets/odisha-farming.jpg";
import { ArrowRight, Leaf, CloudRain, TrendingUp, Users } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackground})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start text-white">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">Smart India Hackathon 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Agricultural Intelligence for Odisha
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Empowering farmers with AI-driven crop predictions, weather insights, and smart recommendations
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/optimization")}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Agricultural Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced technology to optimize your farming operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: TrendingUp,
              title: "Yield Prediction",
              desc: "AI-powered crop yield forecasting",
              color: "text-primary",
            },
            {
              icon: CloudRain,
              title: "Weather Intelligence",
              desc: "Real-time weather data and alerts",
              color: "text-blue-500",
            },
            {
              icon: Leaf,
              title: "Crop Recommendations",
              desc: "Personalized farming suggestions",
              color: "text-green-500",
            },
            {
              icon: Users,
              title: "Community Support",
              desc: "Connect with fellow farmers",
              color: "text-orange-500",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                Advanced Agricultural Technology
              </h2>
              <p className="text-lg text-muted-foreground">
                Leveraging machine learning, satellite imagery, and real-time data analytics to revolutionize farming in Odisha
              </p>
              <div className="space-y-4">
                {[
                  "Precision agriculture recommendations",
                  "Climate-adaptive crop selection",
                  "Market price intelligence",
                  "Soil health monitoring",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={cropPrediction}
                alt="Crop Prediction"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src={odishaFarming}
                alt="Odisha Farming"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-6">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of farmers already using our platform
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/optimization")}
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Home;
