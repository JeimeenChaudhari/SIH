import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FarmerInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FarmerData) => void;
  language: 'en' | 'od' | 'hi';
}

export interface FarmerData {
  userType: string;
  district: string;
  crop: string;
  season: string;
  soilType: string;
  soilPH: string;
  area: string;
}

const districts = [
  "Anugul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", 
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", 
  "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
  "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"
];

const crops = [
  "Arhar/Tur", "Bajra", "Banana", "Barley", "Black pepper", "Cabbage", "Cashewnut", 
  "Coconut", "Cotton", "Cowpea", "Dry chillies", "Garlic", "Ginger", "Gram", 
  "Groundnut", "Jowar", "Jute", "Lentil", "Maize", "Mesta", "Moong", "Niger seed", 
  "Onion", "Other Rabi pulses", "Potato", "Ragi", "Rice", "Safflower", "Sesamum", 
  "Small millets", "Sugarcane", "Sunflower", "Sweet potato", "Tomato", "Turmeric", 
  "Urad", "Wheat"
];

const userTypes = ["Guest", "Farmer", "Government Agent", "Admin"];
const seasons = ["Kharif", "Rabi", "Zaid"];
const soilTypes = ["BLACK SOIL & RED SOIL", "RED SOIL", "BLACK SOIL", "ALLUVIAL SOIL", "LATERITE SOIL"];

const translations = {
  en: {
    title: "Enter Your Farm Details",
    description: "Provide your farm information to get personalized crop yield predictions and recommendations",
    userType: "User Type",
    selectUserType: "Select user type",
    district: "District",
    selectDistrict: "Select your district",
    crop: "Crop Type",
    selectCrop: "Select crop",
    season: "Season",
    selectSeason: "Select season",
    soilType: "Soil Type",
    selectSoilType: "Select soil type",
    soilPH: "Soil pH",
    area: "Farm Area (hectares)",
    submit: "Get Predictions",
  },
  od: {
    title: "ଆପଣଙ୍କ ଚାଷ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ",
    description: "ବ୍ୟକ୍ତିଗତ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ଏବଂ ସୁପାରିଶ ପାଇବା ପାଇଁ ଆପଣଙ୍କର ଚାଷ ସୂଚନା ପ୍ରଦାନ କରନ୍ତୁ",
    userType: "ବ୍ୟବହାରକାରୀ ପ୍ରକାର",
    selectUserType: "ବ୍ୟବହାରକାରୀ ପ୍ରକାର ଚୟନ କରନ୍ତୁ",
    district: "ଜିଲ୍ଲା",
    selectDistrict: "ଆପଣଙ୍କର ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ",
    crop: "ଫସଲ ପ୍ରକାର",
    selectCrop: "ଫସଲ ଚୟନ କରନ୍ତୁ",
    season: "ଋତୁ",
    selectSeason: "ଋତୁ ଚୟନ କରନ୍ତୁ",
    soilType: "ମାଟି ପ୍ରକାର",
    selectSoilType: "ମାଟି ପ୍ରକାର ଚୟନ କରନ୍ତୁ",
    soilPH: "ମାଟି pH",
    area: "ଚାଷ କ୍ଷେତ୍ର (ହେକ୍ଟର)",
    submit: "ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ",
  },
  hi: {
    title: "अपनी खेती का विवरण दर्ज करें",
    description: "व्यक्तिगत फसल उत्पादन पूर्वानुमान और सिफारिशें प्राप्त करने के लिए अपनी खेती की जानकारी प्रदान करें",
    userType: "उपयोगकर्ता प्रकार",
    selectUserType: "उपयोगकर्ता प्रकार चुनें",
    district: "जिला",
    selectDistrict: "अपना जिला चुनें",
    crop: "फसल का प्रकार",
    selectCrop: "फसल चुनें",
    season: "मौसम",
    selectSeason: "मौसम चुनें",
    soilType: "मिट्टी का प्रकार",
    selectSoilType: "मिट्टी का प्रकार चुनें",
    soilPH: "मिट्टी pH",
    area: "खेत का क्षेत्रफल (हेक्टेयर)",
    submit: "पूर्वानुमान प्राप्त करें",
  }
};

export function FarmerInputDialog({ open, onOpenChange, onSubmit, language }: FarmerInputDialogProps) {
  const [formData, setFormData] = useState<FarmerData>({
    userType: "Guest",
    district: "",
    crop: "",
    season: "",
    soilType: "",
    soilPH: "",
    area: "",
  });

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).every(val => val !== "")) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userType">{t.userType}</Label>
              <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectUserType} />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">{t.district}</Label>
              <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectDistrict} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">{t.crop}</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCrop} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">{t.season}</Label>
              <Select value={formData.season} onValueChange={(value) => setFormData({...formData, season: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSeason} />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map(season => (
                    <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">{t.soilType}</Label>
              <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSoilType} />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(soil => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilPH">{t.soilPH}</Label>
              <Input 
                id="soilPH"
                type="number"
                step="0.1"
                min="0"
                max="14"
                placeholder="e.g., 6.5"
                value={formData.soilPH}
                onChange={(e) => setFormData({...formData, soilPH: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">{t.area}</Label>
              <Input 
                id="area"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 2.5"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/90 hover:opacity-90">
            {t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
