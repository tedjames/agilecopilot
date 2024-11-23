import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FeaturesPage() {
  return (
    <main>
      <PageHeader
        title="Feature Planning Prompts"
        description="Customized prompts used to refine features"
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Feature Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-xs uppercase text-muted-foreground">BILLING</Label>
            <Input
              className="mt-2 bg-background"
              placeholder="Description..."
            />
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Prompt..."
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
            <Label className="text-xs uppercase text-muted-foreground">
              TECHNICAL SPECS PROMPT - BACKEND
            </Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Story breakdown prompt..."
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
            + New Feature Type
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
} 