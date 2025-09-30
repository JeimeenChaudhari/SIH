import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { FarmerInputDialog, FarmerData } from "@/components/FarmerInputDialog";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [language, setLanguage] = useState<"en" | "od">("en");
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleDataSubmit = (data: FarmerData) => {
    setFarmerData(data);
    setDialogOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'od' : 'en');
  };

  return (
    <div className="min-h-screen">
      {!farmerData ? (
        <div className="container mx-auto p-6">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="flex justify-end mb-4">
              <Button onClick={toggleLanguage} variant="outline">
                {language === 'en' ? 'ଓଡ଼ିଆ' : 'English'}
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Farm Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your farm details to view personalized dashboard
            </p>
          </div>
          <FarmerInputDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleDataSubmit}
            language={language}
          />
        </div>
      ) : (
        <Dashboard language={language} farmerData={farmerData} />
      )}
    </div>
  );
};

export default DashboardPage;
