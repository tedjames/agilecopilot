"use client";

import { AppCard } from "@/components/app-card";
import { PageHeader } from "@/components/page-header";
import { Button as CustomButton } from "@/components/button";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowLeft, CrossIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { useState } from "react";

const statuses = [
  { label: "Ready for Development", value: "development" },
  { label: "Ready for Review", value: "review" },
  { label: "Refinement Needed", value: "refinement" },
];

const appTypes = [
  { label: "Web Application", value: "web" },
  { label: "Mobile App", value: "mobile" },
  { label: "Desktop Application", value: "desktop" },
  { label: "API Service", value: "api" },
];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  appType: z
    .string({ required_error: "Please select an app type." })
    .min(1, { message: "Please select an app type." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  productSpecs: z
    .string()
    .min(20, { message: "Product specs must be at least 20 characters." }),
  featureBreakdown: z.string().optional(),
});

export default function FeaturePlanning() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      status: "",
      appType: "",
      description: "",
      productSpecs: "",
      featureBreakdown: "",
    },
  });

  const hasUnsavedChanges = Object.keys(form.formState.dirtyFields).length > 0;

  function handleDialogClose() {
    if (hasUnsavedChanges) {
      setIsConfirmOpen(true);
    } else {
      setIsDialogOpen(false);
      form.reset();
    }
  }

  function handleConfirmedClose() {
    setIsConfirmOpen(false);
    setIsDialogOpen(false);
    form.reset();
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission
    console.log(data);
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                        App Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter app name..." {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                          Status
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`justify-between w-[240px] ${
                                field.value ? "" : "text-neutral-400"
                              }`}
                            >
                              {field.value
                                ? statuses.find(
                                    (type) => type.value === field.value
                                  )?.label
                                : "Select a status..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[240px] p-0">
                            {statuses.map((type) => (
                              <Button
                                key={type.value}
                                onClick={() => field.onChange(type.value)}
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-green-600",
                                    field.value === type.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {type.label}
                              </Button>
                            ))}
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                          App Type
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`justify-between w-[280px] ${
                                field.value ? "" : "text-neutral-400"
                              }`}
                            >
                              {field.value
                                ? appTypes.find(
                                    (type) => type.value === field.value
                                  )?.label
                                : "Select app type..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[280px] p-0">
                            {appTypes.map((type) => (
                              <Button
                                key={type.value}
                                onClick={() => field.onChange(type.value)}
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-green-600",
                                    field.value === type.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {type.label}
                              </Button>
                            ))}
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                        Short Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief overview of the application..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productSpecs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                        High-Level Specifications
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Key requirements and specifications..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featureBreakdown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                        Suggested Feature Breakdown
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List major features and components..."
                          className="resize-none min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <CustomButton icon={<XIcon />} label="Cancel" />
                  </DialogClose>
                  <CustomButton
                    icon={<PlusIcon className="text-white" />}
                    type="submit"
                    label="Create New App"
                    className="bg-green-600 hover:bg-green-600"
                  />
                </div>
              </form>
            </Form>
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
        <AppCard
          id="09840123"
          title="ezMAF"
          description="Medication Administration Form"
          featureCount={21}
          storyCount={10}
          status="Refinement Needed"
        />
        <AppCard
          id="41293874"
          title="Social Care Manager"
          description="1115 Platform Application for Social Care Management"
          featureCount={10}
          storyCount={5}
          status="Ready for Review"
        />
        <AppCard
          id="41293874"
          title="Social Care Manager"
          description="1115 Platform Application for Social Care Management"
          featureCount={10}
          storyCount={5}
          status="Ready for Development"
        />
      </div>
    </main>
  );
}
