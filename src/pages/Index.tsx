import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmerInputDialog, FarmerData } from "@/components/FarmerInputDialog";
import { Dashboard } from "@/components/Dashboard";
import { FAQSection } from "@/components/FAQSection";
import { ChatBot } from "@/components/ChatBot";
import { BarChart3, CloudRain, Sprout, TrendingUp, Users, Shield, Database, Zap, Award, Target, Globe } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import cropPrediction from "@/assets/crop-prediction.jpg";
import odishaFarming from "@/assets/odisha-farming.jpg";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [language, setLanguage] = useState<'en' | 'od' | 'hi'>('en');
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'faq'>('landing');

  const handleFormSubmit = (data: FarmerData) => {
    setFarmerData(data);
    setShowDashboard(true);
    setCurrentView('dashboard');
  };

  const handleLanguageChange = (value: 'en' | 'od' | 'hi') => {
    setLanguage(value);
  };

  const translations = {
    en: {
      home: "Home",
      dashboard: "Dashboard",
      faq: "FAQ",
      language: "ଓଡ଼ିଆ",
      hero: {
        title: "Harvestra",
        subtitle: "AI-Powered Smart Farming Platform",
        badge: "Smart India Hackathon 2025",
        description: "Empowering Odisha farmers with cutting-edge AI technology for precise crop yield predictions, real-time weather advisories, and data-driven farming decisions",
        primaryButton: "Get Started",
        secondaryButton: "View Demo",
        stats: {
          farmers: "10,000+",
          farmersLabel: "Active Farmers",
          districts: "30",
          districtsLabel: "Districts Covered",
          accuracy: "95%",
          accuracyLabel: "Prediction Accuracy",
          support: "24/7",
          supportLabel: "AI Support"
        }
      },
      features: {
        title: "Advanced Features",
        subtitle: "Everything you need for smart farming decisions",
        items: [
          {
            title: "AI Crop Yield Prediction",
            description: "Get accurate predictions for 37+ crops using machine learning models trained on historical data"
          },
          {
            title: "Real-Time Weather Advisory",
            description: "Live weather updates and farming recommendations for all 30 districts of Odisha"
          },
          {
            title: "Soil Health Analysis",
            description: "Comprehensive soil testing recommendations and pH level monitoring for optimal growth"
          },
          {
            title: "Smart Irrigation Planning",
            description: "Water management strategies based on crop type, season, and weather patterns"
          },
          {
            title: "Fertilizer Recommendations",
            description: "Precise NPK ratios and organic alternatives for sustainable farming"
          },
          {
            title: "Multi-Language Support",
            description: "Available in English and Odia for seamless communication"
          }
        ]
      },
      technology: {
        title: "Built with Enterprise-Grade Technology",
        subtitle: "Leveraging the latest AI and cloud infrastructure",
        items: [
          { icon: "ai", label: "Advanced AI Models" },
          { icon: "cloud", label: "Cloud Infrastructure" },
          { icon: "security", label: "Enterprise Security" },
          { icon: "data", label: "Big Data Analytics" }
        ]
      },
      impact: {
        title: "Making an Impact",
        subtitle: "Transforming agriculture across Odisha",
        stat1: "₹50Cr+",
        stat1Label: "Farmer Income Increase",
        stat2: "30%",
        stat2Label: "Yield Improvement",
        stat3: "100K+",
        stat3Label: "Hectares Monitored"
      },
      cta: {
        title: "Ready to Transform Your Farming?",
        description: "Join thousands of farmers using Harvestra for smarter farming decisions",
        button: "Start Your Journey"
      }
    },
    hi: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      faq: "FAQ",
      language: "English",
      hero: {
        title: "कृषिमित्र",
        subtitle: "AI-संचालित स्मार्ट खेती प्लेटफॉर्म",
        badge: "स्मार्ट इंडिया हैकथॉन 2025",
        description: "सटीक फसल उपज पूर्वानुमान, रीयल-टाइम मौसम सलाह, और डेटा-संचालित खेती निर्णयों के लिए ओडिशा के किसानों को सशक्त बनाना",
        primaryButton: "शुरू करें",
        secondaryButton: "डेमो देखें",
        stats: {
          farmers: "10,000+",
          farmersLabel: "सक्रिय किसान",
          districts: "30",
          districtsLabel: "जिले कवर किए गए",
          accuracy: "95%",
          accuracyLabel: "पूर्वानुमान सटीकता",
          support: "24/7",
          supportLabel: "AI सहायता"
        }
      },
      features: {
        title: "उन्नत सुविधाएं",
        subtitle: "स्मार्ट खेती के फैसलों के लिए आपको जो कुछ भी चाहिए",
        items: [
          {
            title: "AI फसल उपज पूर्वानुमान",
            description: "37+ फसलों के लिए सटीक पूर्वानुमान प्राप्त करें"
          },
          {
            title: "रीयल-टाइम मौसम सलाह",
            description: "ओडिशा के सभी 30 जिलों के लिए मौसम अपडेट"
          },
          {
            title: "मिट्टी स्वास्थ्य विश्लेषण",
            description: "इष्टतम वृद्धि के लिए मिट्टी परीक्षण सिफारिशें"
          },
          {
            title: "स्मार्ट सिंचाई योजना",
            description: "फसल प्रकार और मौसम पर आधारित जल प्रबंधन"
          },
          {
            title: "उर्वरक सिफारिशें",
            description: "टिकाऊ खेती के लिए सटीक NPK अनुपात"
          },
          {
            title: "बहु-भाषा समर्थन",
            description: "अंग्रेजी, ओडिया और हिंदी में उपलब्ध"
          }
        ]
      },
      technology: {
        title: "उद्यम-स्तरीय प्रौद्योगिकी के साथ निर्मित",
        subtitle: "नवीनतम AI और क्लाउड अवसंरचना का लाभ उठाना",
        items: [
          { icon: "ai", label: "उन्नत AI मॉडल" },
          { icon: "cloud", label: "क्लाउड अवसंरचना" },
          { icon: "security", label: "उद्यम सुरक्षा" },
          { icon: "data", label: "बिग डेटा विश्लेषण" }
        ]
      },
      impact: {
        title: "प्रभाव बना रहे हैं",
        subtitle: "ओडिशा में कृषि को बदल रहे हैं",
        stat1: "₹50Cr+",
        stat1Label: "किसान आय वृद्धि",
        stat2: "30%",
        stat2Label: "उपज सुधार",
        stat3: "100K+",
        stat3Label: "हेक्टेयर निगरानी"
      },
      cta: {
        title: "अपनी खेती को बदलने के लिए तैयार हैं?",
        description: "स्मार्ट खेती के फैसलों के लिए कृषिमित्र का उपयोग करने वाले हजारों किसानों से जुड़ें",
        button: "अपनी यात्रा शुरू करें"
      }
    },
    od: {
      home: "ମୂଳପୃଷ୍ଠା",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      faq: "FAQ",
      language: "English",
      hero: {
        title: "କୃଷିମିତ୍ର",
        subtitle: "AI-ଚାଳିତ ସ୍ମାର୍ଟ କୃଷି ପ୍ଲାଟଫର୍ମ",
        badge: "ସ୍ମାର୍ଟ ଇଣ୍ଡିଆ ହାକାଥନ୍ 2025",
        description: "ସଠିକ୍ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ, ରିଅଲ୍-ଟାଇମ୍ ପାଣିପାଗ ପରାମର୍ଶ, ଏବଂ ତଥ୍ୟ-ଚାଳିତ କୃଷି ନିଷ୍ପତ୍ତି ପାଇଁ ଓଡ଼ିଶା କୃଷକମାନଙ୍କୁ ସଶକ୍ତ କରିବା",
        primaryButton: "ଆରମ୍ଭ କରନ୍ତୁ",
        secondaryButton: "ଡେମୋ ଦେଖନ୍ତୁ",
        stats: {
          farmers: "10,000+",
          farmersLabel: "ସକ୍ରିୟ କୃଷକ",
          districts: "30",
          districtsLabel: "ଜିଲ୍ଲା ଆବୃତ",
          accuracy: "95%",
          accuracyLabel: "ପୂର୍ବାନୁମାନ ସଠିକତା",
          support: "24/7",
          supportLabel: "AI ସହାୟତା"
        }
      },
      features: {
        title: "ଉନ୍ନତ ବୈଶିଷ୍ଟ୍ୟଗୁଡିକ",
        subtitle: "ସ୍ମାର୍ଟ କୃଷି ନିଷ୍ପତ୍ତି ପାଇଁ ଆପଣ ଆବଶ୍ୟକ କରୁଥିବା ସବୁକିଛି",
        items: [
          {
            title: "AI ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
            description: "37+ ଫସଲ ପାଇଁ ସଠିକ୍ ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ"
          },
          {
            title: "ରିଅଲ୍-ଟାଇମ୍ ପାଣିପାଗ ପରାମର୍ଶ",
            description: "ଓଡ଼ିଶାର ସମସ୍ତ 30 ଜିଲ୍ଲା ପାଇଁ ପାଣିପାଗ ଅପଡେଟ୍"
          },
          {
            title: "ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ",
            description: "ସର୍ବୋତ୍ତମ ବୃଦ୍ଧି ପାଇଁ ମାଟି ପରୀକ୍ଷଣ ସୁପାରିଶ"
          },
          {
            title: "ସ୍ମାର୍ଟ ଜଳସେଚନ ଯୋଜନା",
            description: "ଫସଲ ପ୍ରକାର ଏବଂ ପାଣିପାଗ ଉପରେ ଆଧାରିତ ଜଳ ପରିଚାଳନା"
          },
          {
            title: "ସାର ସୁପାରିଶ",
            description: "ସ୍ଥାୟୀ କୃଷି ପାଇଁ ସଠିକ୍ NPK ଅନୁପାତ"
          },
          {
            title: "ବହୁ-ଭାଷା ସମର୍ଥନ",
            description: "ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆରେ ଉପଲବ୍ଧ"
          }
        ]
      },
      technology: {
        title: "ଉଦ୍ୟୋଗ-ସ୍ତରୀୟ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ସହିତ ନିର୍ମିତ",
        subtitle: "ନବୀନତମ AI ଏବଂ କ୍ଲାଉଡ୍ ଭିତ୍ତିଭୂମି ବ୍ୟବହାର କରି",
        items: [
          { icon: "ai", label: "ଉନ୍ନତ AI ମଡେଲ୍" },
          { icon: "cloud", label: "କ୍ଲାଉଡ୍ ଭିତ୍ତିଭୂମି" },
          { icon: "security", label: "ଉଦ୍ୟୋଗ ସୁରକ୍ଷା" },
          { icon: "data", label: "ବିଗ୍ ଡାଟା ବିଶ୍ଳେଷଣ" }
        ]
      },
      impact: {
        title: "ପ୍ରଭାବ ସୃଷ୍ଟି କରୁଛୁ",
        subtitle: "ଓଡ଼ିଶାରେ କୃଷିକୁ ରୂପାନ୍ତରିତ କରୁଛୁ",
        stat1: "₹50Cr+",
        stat1Label: "କୃଷକ ଆୟ ବୃଦ୍ଧି",
        stat2: "30%",
        stat2Label: "ଉତ୍ପାଦନ ଉନ୍ନତି",
        stat3: "100K+",
        stat3Label: "ହେକ୍ଟର ମନିଟର କରାଯାଉଛି"
      },
      cta: {
        title: "ଆପଣଙ୍କର କୃଷିକୁ ରୂପାନ୍ତରିତ କରିବାକୁ ପ୍ରସ୍ତୁତ?",
        description: "ସ୍ମାର୍ଟ କୃଷି ନିଷ୍ପତ୍ତି ପାଇଁ କୃଷିମିତ୍ର ବ୍ୟବହାର କରୁଥିବା ହଜାରେ କୃଷକଙ୍କ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ",
        button: "ଆପଣଙ୍କର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ"
      }
    }
  };

  const t = translations[language];

  // Dashboard View
  if (currentView === 'dashboard' && farmerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t.hero.title}
              </h1>
              <div className="hidden md:flex gap-4">
                <Button variant="ghost" onClick={() => setCurrentView('landing')}>{t.home}</Button>
                <Button variant="ghost" onClick={() => setCurrentView('dashboard')}>{t.dashboard}</Button>
                <Button variant="ghost" onClick={() => setCurrentView('faq')}>{t.faq}</Button>
              </div>
            </div>
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'od' | 'hi')}
              className="px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="od">ଓଡ଼ିଆ</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </nav>
        <Dashboard farmerData={farmerData} language={language} />
        <ChatBot language={language} />
      </div>
    );
  }

  // FAQ View
  if (currentView === 'faq') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t.hero.title}
              </h1>
              <div className="hidden md:flex gap-4">
                <Button variant="ghost" onClick={() => setCurrentView('landing')}>{t.home}</Button>
                <Button variant="ghost" onClick={() => setCurrentView('dashboard')}>{t.dashboard}</Button>
                <Button variant="ghost" onClick={() => setCurrentView('faq')}>{t.faq}</Button>
              </div>
            </div>
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'od' | 'hi')}
              className="px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="od">ଓଡ଼ିଆ</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </nav>
        <FAQSection language={language} />
        <ChatBot language={language} />
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/harvestra-logo.png" alt="Harvestra" className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  {t.hero.title}
                </h1>
                <p className="text-xs text-muted-foreground">{t.hero.badge}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={language} 
                onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'od' | 'hi')}
                className="px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="od">ଓଡ଼ିଆ</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackground} 
            alt="Agricultural fields" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Smart Crop Yield
                <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Prediction for Odisha
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90">
                {t.hero.subtitle}
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.location.href = '/yield-prediction'}
              >
                <Sprout className="mr-2 h-5 w-5" />
                {t.hero.primaryButton}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-primary/5"
                onClick={() => setCurrentView('dashboard')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                {t.hero.secondaryButton}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 animate-fade-in">
              {[
                { value: t.hero.stats.farmers, label: t.hero.stats.farmersLabel, icon: Users },
                { value: t.hero.stats.districts, label: t.hero.stats.districtsLabel, icon: Globe },
                { value: t.hero.stats.accuracy, label: t.hero.stats.accuracyLabel, icon: Target },
                { value: t.hero.stats.support, label: t.hero.stats.supportLabel, icon: Zap }
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.features.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const icons = [BarChart3, CloudRain, Sprout, TrendingUp, Database, Globe];
              const Icon = icons[index];
              return (
                <Card key={index} className="group hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.technology.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.technology.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {t.technology.items.map((item, index) => {
              const icons = { ai: Zap, cloud: Database, security: Shield, data: BarChart3 };
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <div key={index} className="text-center p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.label}</h3>
                </div>
              );
            })}
          </div>

          {/* Image Showcase */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src={cropPrediction} alt="Crop Prediction" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">AI-Powered Predictions</h3>
                  <p className="text-muted-foreground">Advanced machine learning for accurate yield forecasting</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src={odishaFarming} alt="Odisha Farming" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Serving Odisha Farmers</h3>
                  <p className="text-muted-foreground">Covering all 30 districts with localized solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.impact.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.impact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: t.impact.stat1, label: t.impact.stat1Label },
              { value: t.impact.stat2, label: t.impact.stat2Label },
              { value: t.impact.stat3, label: t.impact.stat3Label }
            ].map((stat, index) => (
              <div key={index} className="text-center p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-4">{stat.value}</div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              {t.cta.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.cta.description}
            </p>
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-xl hover:shadow-2xl transition-all"
              onClick={() => setDialogOpen(true)}
            >
              <Sprout className="mr-2 h-6 w-6" />
              {t.cta.button}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/harvestra-logo.png" alt="Harvestra Logo" className="h-8 w-8" />
              <span className="font-semibold">{t.hero.title} © 2025</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built for Smart India Hackathon 2025
            </div>
          </div>
        </div>
      </footer>

      <FarmerInputDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSubmit={handleFormSubmit}
        language={language}
      />
      <ChatBot language={language} />
    </div>
  );
};

export default Index;
