import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UserStoriesPage() {
  return (
    <main>
      <PageHeader
        title="User Story Prompts"
        description="Customized prompts used to generate user stories"
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Story Generation</CardTitle>
          <CardDescription>
            Prompts for generating detailed user stories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>USER AUTHENTICATION</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter user story prompt..."
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
            <Label>PAYMENT PROCESSING</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter user story prompt..."
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
            + New Story Type
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
} 