"use client";

import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PencilIcon, PlusIcon, LayersIcon } from "lucide-react";
import { Button as CustomButton } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { EditAppForm } from "@/components/forms/edit-app-form";
import type { TEditAppFormData } from "@/components/forms/edit-app-form";
import { CreateFeatureForm } from "@/components/forms/create-feature-form";
import type { TCreateFeatureFormData } from "@/components/forms/create-feature-form";
import { MultipleFeaturesForm } from "@/components/forms/multiple-features-form";
import type { TMultipleFeaturesFormData } from "@/components/forms/multiple-features-form";

interface Feature {
  id: string;
  appId: string;
  userId: string;
  name: string;
  status: string;
  featureType: string | null;
  shortDescription: string | null;
  featureSpecs: string | null;
  storyBreakdown: string | null;
  images: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function Features({
  params,
}: {
  params: { featureId: string };
}) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentApp, setCurrentApp] = useState<Feature | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isMultipleFeatureDialogOpen, setIsMultipleFeatureDialogOpen] =
    useState(false);

  async function fetchFeatures() {
    console.log("Fetching features...");
    try {
      const response = await fetch(
        `/api/core/features?appId=${params.featureId}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error("Failed to fetch features:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch features"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFeatures();
  }, [params.featureId]);

  useEffect(() => {
    fetchCurrentApp();
  }, [params.featureId]);

  async function fetchCurrentApp() {
    try {
      console.log("Fetching app details for:", params.featureId);
      const response = await fetch(
        `/api/core/application-details?appId=${params.featureId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch app details");
      }

      console.log("Fetched app details:", data);
      setCurrentApp(data.data);
    } catch (error) {
      console.error("Failed to fetch app details:", error);
    }
  }

  function handleEditDialogClose() {
    if (hasUnsavedChanges) {
      // Implement confirmation dialog if needed
      setIsEditDialogOpen(false);
    } else {
      setIsEditDialogOpen(false);
    }
  }

  async function handleEditSubmit(data: TEditAppFormData) {
    setIsEditDialogOpen(false);
    setHasUnsavedChanges(false);
    await fetchFeatures(); // Refresh the data
  }

  async function handleCreateSubmit(data: TCreateFeatureFormData) {
    setIsCreateDialogOpen(false);
    await fetchFeatures(); // Refresh the features list
  }

  async function handleMultipleFeatureSubmit(data: TMultipleFeaturesFormData) {
    setIsMultipleFeatureDialogOpen(false);
    // API integration will go here later
    await fetchFeatures(); // Refresh the features list
  }

  if (isLoading) {
    return (
      <main className="container mx-auto p-6">
        <PageHeader
          title="Features"
          description="Create or select an existing app to get started"
          prefix="ezMAF"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      </main>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container mx-auto p-6">
      <PageHeader
        title="Features"
        description="Create or select an existing app to get started"
        prefix="ezMAF"
      />
      <div className="flex gap-4 mb-6">
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            if (!open) handleEditDialogClose();
            else setIsEditDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <CustomButton label="Edit Application" icon={<PencilIcon />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Edit Application
              </DialogTitle>
              <DialogDescription>
                Modify the application details and specifications
              </DialogDescription>
            </DialogHeader>
            {currentApp && (
              <EditAppForm
                initialData={{
                  name: currentApp.name,
                  status: currentApp.status,
                  type: currentApp.featureType || "",
                  shortDescription: currentApp.shortDescription || "",
                  productSpecs: currentApp.featureSpecs || "",
                  featureBreakdown: currentApp.storyBreakdown || "",
                }}
                appId={currentApp.id}
                onSubmit={handleEditSubmit}
                onCancel={() => handleEditDialogClose()}
                onFormChange={setHasUnsavedChanges}
              />
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => setIsCreateDialogOpen(open)}
        >
          <DialogTrigger asChild>
            <CustomButton label="Create Feature" icon={<PlusIcon />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Create Feature
              </DialogTitle>
              <DialogDescription>
                Add a new feature to your application
              </DialogDescription>
            </DialogHeader>
            <CreateFeatureForm
              appId={params.featureId}
              onSubmit={handleCreateSubmit}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={isMultipleFeatureDialogOpen}
          onOpenChange={(open) => setIsMultipleFeatureDialogOpen(open)}
        >
          <DialogTrigger asChild>
            <CustomButton
              label="Create Multiple Features"
              icon={<LayersIcon />}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Create Multiple Features
              </DialogTitle>
              <DialogDescription>
                Generate multiple features for your application at once
              </DialogDescription>
            </DialogHeader>
            <MultipleFeaturesForm
              appId={params.featureId}
              onSubmit={handleMultipleFeatureSubmit}
              onCancel={() => setIsMultipleFeatureDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      {features.length === 0 ? (
        <div className="text-left text-sm py-8 text-muted-foreground">
          No features found. Create one to get started!
        </div>
      ) : Array.isArray(features) ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: Feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.name}
              description={feature.shortDescription ?? ""}
              featureCount={0}
              storyCount={0}
              status={
                feature.status as
                  | "Refinement Needed"
                  | "Ready for Review"
                  | "Ready for Development"
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-left text-sm py-8 text-muted-foreground">
          Error: Invalid features data received
        </div>
      )}
    </main>
  );
}
