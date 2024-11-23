"use client";

import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Wand2, Pencil, Trash2 } from "lucide-react";

type SettingsSection = "system" | "applications" | "features" | "user-stories" | "technical-specs";

function SystemSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="System Prompts"
        description="Prompts used for various functions across the app"
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>System Prompt (Applied to Everything)</CardTitle>
          <CardDescription>
            This prompt will be applied as a base context for all AI interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              className="min-h-[200px] bg-background"
              placeholder="Enter your system prompt..."
            />
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function ApplicationsSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="Application Prompts"
        description="Customized prompts used to generate user stories"
      />

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Feature Breakdown</CardTitle>
            <CardDescription>
              Prompts for breaking down a set of features
            </CardDescription>
          </div>
          <Button variant="outline">
            + New Application Type
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>FULL-STACK WEB APP</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter feature breakdown prompt..."
            />
            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Data Pipeline</Label>
            <Textarea
              className="mt-2 min-h-[150px] bg-background"
              placeholder="Enter data pipeline prompt..."
            />
            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
}

function FeaturesSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="Feature Planning Prompts"
        description="Customized prompts used to refine features"
      />

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Feature Specifications</CardTitle>
          </div>
          <Button variant="outline">
            + New Feature Type
          </Button>
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
}

function UserStoriesSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="User Story Prompts"
        description="Customized prompts used to generate user stories"
      />

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Story Generation</CardTitle>
            <CardDescription>
              Prompts for generating detailed user stories
            </CardDescription>
          </div>
          <Button variant="outline">
            + New Story Type
          </Button>
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
}

function TechnicalSpecsSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="Technical Specification Prompts"
        description="Customized prompts used to generate technical specifications"
      />

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Technical Requirements</CardTitle>
            <CardDescription>
              Prompts for generating detailed technical specifications
            </CardDescription>
          </div>
          <Button variant="outline">
            + New Spec Type
          </Button>
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
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
                <Wand2 className="mr-2 h-4 w-4" />
                Optimize Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  const [currentSection, setCurrentSection] = useState<SettingsSection>("system");

  const handleSectionClick = (section: SettingsSection) => {
    setCurrentSection(section);
  };

  return (
    <div>
      <div className="fixed left-0 top-0 h-screen w-64 border-r bg-background p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-muted-foreground">
            Settings / {currentSection.toUpperCase()}
          </div>
        </div>

        <div className="mb-4 mt-6 px-2 text-sm font-semibold text-muted-foreground">
          PROMPTS
        </div>
        <div className="space-y-1">
          <div
            className={cn(
              "mb-2 px-2 py-2 cursor-pointer rounded-md",
              currentSection === "system" && "bg-muted"
            )}
            onClick={() => handleSectionClick("system")}
          >
            System
          </div>
          <div 
            className={cn(
              "mb-2 px-2 py-2 cursor-pointer rounded-md",
              currentSection === "applications" && "bg-muted"
            )}
            onClick={() => handleSectionClick("applications")}
          >
            Applications
          </div>
          <div 
            className={cn(
              "mb-2 px-2 py-2 cursor-pointer rounded-md",
              currentSection === "features" && "bg-muted"
            )}
            onClick={() => handleSectionClick("features")}
          >
            Features
          </div>
          <div 
            className={cn(
              "mb-2 px-2 py-2 cursor-pointer rounded-md",
              currentSection === "user-stories" && "bg-muted"
            )}
            onClick={() => handleSectionClick("user-stories")}
          >
            User Stories
          </div>
          <div 
            className={cn(
              "mb-2 px-2 py-2 cursor-pointer rounded-md",
              currentSection === "technical-specs" && "bg-muted"
            )}
            onClick={() => handleSectionClick("technical-specs")}
          >
            Technical Specs
          </div>
        </div>
      </div>

      <div className="pl-64">
        {currentSection === "system" && <SystemSection />}
        {currentSection === "applications" && <ApplicationsSection />}
        {currentSection === "features" && <FeaturesSection />}
        {currentSection === "user-stories" && <UserStoriesSection />}
        {currentSection === "technical-specs" && <TechnicalSpecsSection />}
      </div>
    </div>
  );
}