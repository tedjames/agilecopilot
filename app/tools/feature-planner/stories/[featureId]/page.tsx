"use client";

import { Suspense, useEffect, useState } from "react";
import { UserStoryCard } from "@/components/user-story-card";
import { SelectUserStory } from "@/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/page-header";
import { Button as CustomButton } from "@/components/button";
import { PencilIcon, PlusIcon, LayersIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { EditFeatureForm } from "@/components/forms/edit-feature-form";
import type { TEditFeatureFormData } from "@/components/forms/edit-feature-form";
import { CreateStoryForm } from "@/components/forms/create-story-form";
import type { TCreateStoryFormData } from "@/components/forms/create-story-form";

export default function StoriesPage({
  params,
}: {
  params: { featureId: string };
}) {
  const [stories, setStories] = useState<SelectUserStory[]>([]);
  const [feature, setFeature] = useState<{
    name: string;
    status: string;
    featureType?: string;
    shortDescription?: string;
    featureSpecs?: string;
    storyBreakdown?: string;
    appId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  async function fetchStories() {
    try {
      const response = await fetch(
        `/api/core/stories?featureId=${params.featureId}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stories");
      }

      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch stories"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchFeatureDetails() {
    try {
      const response = await fetch(
        `/api/core/feature-details?featureId=${params.featureId}`
      );
      const { data } = await response.json();
      setFeature(data);
    } catch (error) {
      console.error("Failed to fetch feature details:", error);
    }
  }

  useEffect(() => {
    Promise.all([fetchStories(), fetchFeatureDetails()]);
  }, [params.featureId]);

  async function handleEditSubmit(data: TEditFeatureFormData) {
    try {
      await fetchStories();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update feature:", error);
    }
  }

  async function handleCreateSubmit(data: TCreateStoryFormData) {
    setIsCreateDialogOpen(false);
    await fetchStories();
  }

  if (isLoading) {
    return (
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Stories</h1>
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[125px] w-full rounded-xl" />
          ))}
        </div>
      </main>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container mx-auto p-6">
      <PageHeader
        title={`${feature?.name || ""}`}
        description="Manage user stories for this feature"
        prefix="ezMAF"
      />

      <div className="flex gap-4 mb-6">
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              fetchStories();
            }
          }}
        >
          <DialogTrigger asChild>
            <CustomButton label="Edit Feature" icon={<PencilIcon />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Edit Feature
              </DialogTitle>
              <DialogDescription>
                Modify the feature details and specifications
              </DialogDescription>
            </DialogHeader>
            {feature && (
              <EditFeatureForm
                featureId={params.featureId}
                initialData={{
                  name: feature.name,
                  status: feature.status,
                  featureType: feature.featureType || "",
                  shortDescription: feature.shortDescription || "",
                  featureSpecs: feature.featureSpecs || "",
                  storyBreakdown: feature.storyBreakdown || "",
                  appId: feature.appId,
                }}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditDialogOpen(false)}
                appId={feature.appId}
              />
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              fetchStories();
            }
          }}
        >
          <DialogTrigger asChild>
            <CustomButton label="Create User Story" icon={<PlusIcon />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Create User Story
              </DialogTitle>
              <DialogDescription>
                Create a new user story for this feature
              </DialogDescription>
            </DialogHeader>
            <CreateStoryForm
              featureId={params.featureId}
              onSubmit={handleCreateSubmit}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <CustomButton label="Create Multiple Stories" icon={<LayersIcon />} />
      </div>

      <div className="grid gap-6">
        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No user stories found for this feature.
            </p>
          </div>
        ) : (
          stories.map((story) => (
            <Suspense key={story.id} fallback={<div>Loading...</div>}>
              <UserStoryCard story={story} onStoryUpdate={fetchStories} />
            </Suspense>
          ))
        )}
      </div>
    </main>
  );
}
