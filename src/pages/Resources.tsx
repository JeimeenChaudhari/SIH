import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

const resources = [
  {
    title: "Farming Best Practices",
    description: "Comprehensive guides on modern farming techniques",
    type: "Guide",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    title: "Video Tutorials",
    description: "Learn from expert farmers and agricultural scientists",
    type: "Video",
    icon: Video,
    color: "text-red-500",
  },
  {
    title: "Government Schemes",
    description: "Information about subsidies and support programs",
    type: "Document",
    icon: FileText,
    color: "text-green-500",
  },
  {
    title: "Pest Management",
    description: "Identify and control common crop pests",
    type: "Guide",
    icon: BookOpen,
    color: "text-orange-500",
  },
  {
    title: "Organic Farming",
    description: "Sustainable and chemical-free farming methods",
    type: "Guide",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    title: "Market Linkage",
    description: "Connect with buyers and get best prices",
    type: "Resource",
    icon: ExternalLink,
    color: "text-purple-500",
  },
];

const Resources = () => {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" />
          Learning Resources
        </h1>
        <p className="text-muted-foreground text-lg">
          Educational materials and guides to improve your farming knowledge
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, idx) => (
          <Card
            key={idx}
            className="border-border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <resource.icon className={`h-8 w-8 ${resource.color}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {resource.type}
                </span>
              </div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                Access Resource
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Contact our agricultural experts for personalized guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              Contact Expert
            </Button>
            <Button variant="outline">
              Join Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
