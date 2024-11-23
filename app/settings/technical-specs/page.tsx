import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function TechnicalSpecsPage() {
  return (
    <main>
      <PageHeader
        title="Technical Specification Prompts"
        description="Customized prompts used to generate technical specifications"
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Technical Requirements</CardTitle>
          <CardDescription>
            Prompts for generating detailed technical specifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>API ENDPOINTS</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter technical spec prompt..."
            />
            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="sm">
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="text-muted-foreground">0</span>
              </Button>
            </div>
          </div>

          <div>
            <Label>DATABASE SCHEMA</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter technical spec prompt..."
            />
            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="sm">
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="text-muted-foreground">0</span>
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            + New Spec Type
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
} 