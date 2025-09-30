import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sprout, Droplets, TrendingUp, Cloud } from "lucide-react";

interface FAQSectionProps {
  language: 'en' | 'od' | 'hi';
}

const faqs = {
  en: [
    {
      icon: Sprout,
      question: "What is the best fertilizer for rice in Odisha?",
      answer: "For rice cultivation in Odisha, use Urea (60kg/ha), DAP (50kg/ha), and Potash (30kg/ha). Apply in split doses during transplanting, tillering, and panicle initiation stages."
    },
    {
      icon: Droplets,
      question: "How often should I irrigate during Kharif season?",
      answer: "During Kharif (monsoon), irrigation frequency depends on rainfall. Typically, maintain 5cm water level in paddy fields. For other crops, irrigate every 7-10 days if rainfall is insufficient."
    },
    {
      icon: TrendingUp,
      question: "How can I improve my crop yield?",
      answer: "Key factors: Use quality seeds, maintain optimal soil pH (6-7), follow recommended fertilizer schedules, practice crop rotation, and implement proper pest management."
    },
    {
      icon: Cloud,
      question: "When should I sow crops in Rabi season?",
      answer: "Rabi season sowing typically starts from October to December. Ideal times: Wheat (Nov-Dec), Gram (Oct-Nov), Mustard (Oct-Nov). Monitor local weather for best results."
    }
  ],
  od: [
    {
      icon: Sprout,
      question: "ଓଡ଼ିଶାରେ ଚାଉଳ ପାଇଁ ସର୍ବୋତ୍ତମ ସାର କ'ଣ?",
      answer: "ଓଡ଼ିଶାରେ ଚାଉଳ ଚାଷ ପାଇଁ ୟୁରିଆ (60kg/ହେକ୍ଟର), DAP (50kg/ହେକ୍ଟର), ଏବଂ ପୋଟାଶ୍ (30kg/ହେକ୍ଟର) ବ୍ୟବହାର କରନ୍ତୁ। ରୋପଣ, କୁଶୀକରଣ, ଏବଂ ପାଣିକଳ ଆରମ୍ଭ ସମୟରେ ବିଭକ୍ତ ମାତ୍ରାରେ ପ୍ରୟୋଗ କରନ୍ତୁ।"
    },
    {
      icon: Droplets,
      question: "ଖରିଫ ଋତୁରେ ମୁଁ କେତେ ଥର ସେଚନ କରିବା ଉଚିତ?",
      answer: "ଖରିଫ (ମୌସୁମୀ) ସମୟରେ ସେଚନ ଆବୃତ୍ତି ବର୍ଷା ଉପରେ ନିର୍ଭର କରେ। ସାଧାରଣତଃ, ଧାନ କ୍ଷେତରେ 5cm ଜଳ ସ୍ତର ବଜାୟ ରଖନ୍ତୁ। ଅନ୍ୟ ଫସଲ ପାଇଁ, ବର୍ଷା ପର୍ଯ୍ୟାପ୍ତ ନ ଥିଲେ ପ୍ରତି 7-10 ଦିନରେ ସେଚନ କରନ୍ତୁ।"
    },
    {
      icon: TrendingUp,
      question: "ମୁଁ କିପରି ମୋର ଫସଲ ଉତ୍ପାଦନ ବୃଦ୍ଧି କରିପାରିବି?",
      answer: "ମୁଖ୍ୟ କାରଣ: ଗୁଣାତ୍ମକ ମଞ୍ଜି ବ୍ୟବହାର କରନ୍ତୁ, ସର୍ବୋତ୍ତମ ମାଟି pH (6-7) ବଜାୟ ରଖନ୍ତୁ, ସୁପାରିଶିତ ସାର ସୂଚୀ ଅନୁସରଣ କରନ୍ତୁ, ଫସଲ ଚକ୍ର ଅଭ୍ୟାସ କରନ୍ତୁ, ଏବଂ ଉପଯୁକ୍ତ କୀଟନାଶକ ପରିଚାଳନା କରନ୍ତୁ।"
    },
    {
      icon: Cloud,
      question: "ରବି ଋତୁରେ ମୁଁ କେବେ ଫସଲ ବୁଣିବା ଉଚିତ?",
      answer: "ରବି ଋତୁ ବୁଣା ସାଧାରଣତଃ ଅକ୍ଟୋବରରୁ ଡିସେମ୍ବର ପର୍ଯ୍ୟନ୍ତ ଆରମ୍ଭ ହୁଏ। ଆଦର୍ଶ ସମୟ: ଗହମ (ନଭେମ୍ବର-ଡିସେମ୍ବର), ଚଣା (ଅକ୍ଟୋବର-ନଭେମ୍ବର), ସୋରିଷ (ଅକ୍ଟୋବର-ନଭେମ୍ବର)। ସର୍ବୋତ୍ତମ ଫଳାଫଳ ପାଇଁ ସ୍ଥାନୀୟ ପାଗ ନୀରିକ୍ଷଣ କରନ୍ତୁ।"
    }
  ],
  hi: [
    {
      icon: Sprout,
      question: "ओडिशा में धान के लिए सबसे अच्छा उर्वरक क्या है?",
      answer: "ओडिशा में धान की खेती के लिए यूरिया (60kg/हेक्टेयर), DAP (50kg/हेक्टेयर), और पोटाश (30kg/हेक्टेयर) का उपयोग करें। रोपाई, कल्ले निकलने और बालियों के विकास के चरणों में विभाजित खुराक में लगाएं।"
    },
    {
      icon: Droplets,
      question: "खरीफ के मौसम में मुझे कितनी बार सिंचाई करनी चाहिए?",
      answer: "खरीफ (मानसून) के दौरान सिंचाई की आवृत्ति वर्षा पर निर्भर करती है। आमतौर पर धान के खेतों में 5cm पानी का स्तर बनाए रखें। अन्य फसलों के लिए, यदि वर्षा अपर्याप्त है तो हर 7-10 दिनों में सिंचाई करें।"
    },
    {
      icon: TrendingUp,
      question: "मैं अपनी फसल की उपज कैसे बढ़ा सकता हूं?",
      answer: "मुख्य कारक: गुणवत्तापूर्ण बीज का उपयोग करें, इष्टतम मिट्टी pH (6-7) बनाए रखें, अनुशंसित उर्वरक अनुसूची का पालन करें, फसल चक्र का अभ्यास करें, और उचित कीट प्रबंधन लागू करें।"
    },
    {
      icon: Cloud,
      question: "रबी के मौसम में मुझे फसलें कब बोनी चाहिए?",
      answer: "रबी सीजन की बुवाई आमतौर पर अक्टूबर से दिसंबर तक शुरू होती है। आदर्श समय: गेहूं (नवंबर-दिसंबर), चना (अक्टूबर-नवंबर), सरसों (अक्टूबर-नवंबर)। सर्वोत्तम परिणामों के लिए स्थानीय मौसम की निगरानी करें।"
    }
  ]
};

export function FAQSection({ language }: FAQSectionProps) {
  const t = language === 'en' 
    ? { title: "Farmer Support Chatbot", subtitle: "Common questions and expert answers" }
    : language === 'od'
    ? { title: "କୃଷକ ସହାୟତା ଚାଟବଟ୍", subtitle: "ସାଧାରଣ ପ୍ରଶ୍ନ ଏବଂ ବିଶେଷଜ୍ଞ ଉତ୍ତର" }
    : { title: "किसान सहायता चैटबॉट", subtitle: "सामान्य प्रश्न और विशेषज्ञ उत्तर" };

  const questions = faqs[language] || faqs.en;

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <MessageCircle className="w-10 h-10 text-primary relative" />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="space-y-4">
          {questions.map((faq, index) => (
            <Card 
              key={index} 
              className="bg-[image:var(--gradient-card)] backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                    <faq.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1">{faq.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground ml-12">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
