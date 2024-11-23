"use client";

import { PageHeader } from "@/components/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Wand2, Pencil, Trash2 } from "lucide-react";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "system", label: "System" },
  { id: "applications", label: "Applications" },
  { id: "features", label: "Features" },
  { id: "user-stories", label: "User Stories" },
  { id: "technical-specs", label: "Technical Specs" }
];

function SystemSection() {
  return (
    <main className="p-6">
      <PageHeader
        title="System Prompts"
        description="Prompts used for various functions across the app"
      />

      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">System Prompt (Applied to Everything)</h2>
          <p className="text-sm text-muted-foreground">
            This prompt will be applied as a base context for all AI interactions
          </p>
        </div>
        <div className="space-y-4">
          <Textarea
            className="min-h-[200px] bg-background"
            placeholder="Enter your system prompt..."
          />
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
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

      <div className="mt-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Feature Breakdown</h2>
          <Button variant="outline">
            + New Application Type
          </Button>
        </div>
        <div className="space-y-6">
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
        </div>
      </div>

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

      <div className="space-y-12 mt-6">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Feature Specifications</h2>
            <Button variant="outline">
              + New Feature Type
            </Button>
          </div>
          <div className="space-y-8">
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
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Story Breakdown</h2>
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
        </div>
      </div>

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

      <div className="space-y-6">
        <div className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Story Definition</h2>
            <Button variant="outline">
              + New Story Type
            </Button>
          </div>
          <div className="space-y-8">
            <div>
              <Label className="text-xs uppercase text-muted-foreground">FRONT-END</Label>
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
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Acceptance Criteria</h2>
          </div>
          <div className="space-y-8">
            <div>
              <Label className="text-xs uppercase text-muted-foreground">FRONT-END</Label>
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
          </div>
        </div>
      </div>

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

      <div className="space-y-6">
        <div className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Specifications</h2>
            <Button variant="outline">
              + New Specifications Type
            </Button>
          </div>
          <div className="space-y-8">
            <div>
              <Label className="text-xs uppercase text-muted-foreground">BACKEND API</Label>
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
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Task Breakdown</h2>
          </div>
          <div className="space-y-8">
            <div>
              <Label className="text-xs uppercase text-muted-foreground">BACKEND API</Label>
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
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("system");

  return (
    <div>
      <div className="fixed left-0 top-0 h-screen w-64 border-r bg-background p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-muted-foreground">
            Settings / {activeSection.toUpperCase()}
          </div>
        </div>

        <div className="mb-4 mt-6 px-2 text-sm font-semibold text-muted-foreground">
          PROMPTS
        </div>
        <div className="space-y-1">
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                "mb-2 px-2 py-2 cursor-pointer rounded-md",
                activeSection === section.id && "bg-muted"
              )}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </div>
      </div>

      <div className="pl-64">
        {activeSection === "system" && <SystemSection />}
        {activeSection === "applications" && <ApplicationsSection />}
        {activeSection === "features" && <FeaturesSection />}
        {activeSection === "user-stories" && <UserStoriesSection />}
        {activeSection === "technical-specs" && <TechnicalSpecsSection />}
      </div>
    </div>
  );
}