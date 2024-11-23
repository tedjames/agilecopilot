"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AppCard } from "@/components/app-card";
import { PageHeader } from "@/components/page-header";
import { Button as CustomButton } from "@/components/button";
import { PlusIcon, ArrowLeft, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreateAppForm } from "@/components/forms/create-app-form";
import type { TCreateAppFormData } from "@/components/forms/create-app-form";

interface Application {
  id: string;
  name: string;
  shortDescription: string;
  status: string;
  features: Array<{ id: string }>;
}

export default function FeaturePlanning() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    async function fetchApplications() {
      console.log("Fetching applications...");
      try {
        const response = await fetch("/api/core/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, []);

  function handleDialogClose() {
    if (hasUnsavedChanges) {
      setIsConfirmOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }

  function handleConfirmedClose() {
    setIsConfirmOpen(false);
    setIsDialogOpen(false);
    setHasUnsavedChanges(false);
  }

  async function onSubmit(data: TCreateAppFormData) {
    // Handle form submission
    console.log(data);
    setIsDialogOpen(false);
    setHasUnsavedChanges(false);

    // Refetch applications
    setIsLoading(true);
    try {
      const response = await fetch("/api/core/applications");
      const newData = await response.json();
      setApplications(newData);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFormChange(isDirty: boolean) {
    setHasUnsavedChanges(isDirty);
  }

  function renderApplications() {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      ));
    }

    if (!Array.isArray(applications) || applications.length === 0) {
      return (
        <div className="text-left text-sm py-8 text-muted-foreground">
          No applications found... Create one to get started!
        </div>
      );
    }

    return applications.map((app) => (
      <AppCard
        key={app.id}
        id={app.id}
        title={app.name}
        description={app.shortDescription}
        featureCount={app.features?.length || 0}
        storyCount={0} // You might want to add stories to your data model
        status={
          app.status as
            | "Refinement Needed"
            | "Ready for Review"
            | "Ready for Development"
        }
      />
    ));
  }

  return (
    <main className="container mx-auto p-6">
      <PageHeader
        title="Feature & Story Planning"
        description="Define features and stories for your app. Create a new app or select an existing one."
      />

      <div className="flex justify-start mb-6">
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) handleDialogClose();
            else setIsDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <CustomButton label="Create New App" icon={<PlusIcon />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-orange-200">
                Create New Application
              </DialogTitle>
              <DialogDescription>
                Define the name, type, status, and description of the new
              </DialogDescription>
            </DialogHeader>
            <CreateAppForm
              onSubmit={onSubmit}
              onCancel={() => handleDialogClose()}
              onFormChange={handleFormChange}
            />
          </DialogContent>
        </Dialog>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Looks like you're still working on this...
            </AlertDialogTitle>
            <AlertDialogDescription>
              Any unsaved changes will be lost if you close! Are you sure you
              want to close this out or should we go back to the form?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <CustomButton
              icon={<ArrowLeft />}
              label="Go Back"
              onClick={() => setIsConfirmOpen(false)}
            />
            <CustomButton
              onClick={handleConfirmedClose}
              icon={<XIcon className="text-white" />}
              label="Close"
              className="bg-violet-700 hover:bg-violet-700"
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderApplications()}
      </div>
    </main>
  );
}
