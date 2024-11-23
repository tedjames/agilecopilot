"use client";

import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  XIcon,
  Check,
  ChevronsUpDown,
  WandSparklesIcon,
  ExpandIcon,
  BoltIcon,
  ZapIcon,
  Maximize2,
} from "lucide-react";
import { Button as CustomButton } from "@/components/button";
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
import { DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";

const statuses = [
  { label: "Refinement Needed", value: "Refinement Needed" },
  { label: "Ready for Review", value: "Ready for Review" },
  { label: "Ready for Development", value: "Ready for Development" },
] as const;

const appTypes = [
  { label: "None", value: "none" },
  { label: "Web Application", value: "web" },
  { label: "Mobile App", value: "mobile" },
  { label: "Desktop Application", value: "desktop" },
  { label: "API Service", value: "api" },
] as const;

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  type: z.string({ required_error: "Please select an app type." }),
  shortDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  productSpecs: z
    .string()
    .min(20, { message: "Product specs must be at least 20 characters." }),
  featureBreakdown: z.string().optional(),
});

export type TCreateAppFormData = z.infer<typeof FormSchema>;

interface CreateAppFormProps {
  onSubmit: (data: TCreateAppFormData) => void;
  onCancel: () => void;
  onFormChange?: (isDirty: boolean) => void;
}

export function CreateAppForm({
  onSubmit,
  onCancel,
  onFormChange,
}: CreateAppFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCreateAppFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "SimpleToDo",
      status: "Refinement Needed",
      type: "",
      shortDescription:
        "A straightforward to-do list application designed to help users organize tasks, set priorities, and manage daily activities with ease.",
      productSpecs:
        "User-friendly interface for adding, editing, and deleting tasks. Ability to categorize tasks and set priorities. Option to mark tasks as complete or incomplete. Support for notifications or reminders for tasks with deadlines",
      featureBreakdown:
        "Organize tasks by categories. Set priority levels (e.g., High, Medium, Low), Set reminders for tasks based on time or deadlines, Mark tasks as completed and view progress, Sav/edit/delete tasks via a postgres database.",
    },
  });

  useEffect(() => {
    onFormChange?.(form.formState.isDirty);
  }, [form.formState.isDirty, onFormChange]);

  const handleSubmit = async (data: TCreateAppFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/core/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("ERROR: ", result);
        if (result.warning) {
          toast.warning("Warning", {
            description: `${result.message}`,
          });
        } else {
          toast.error("Error", {
            description: `${result.message}`,
          });
        }
        return onSubmit(data);
      }

      console.log("New App Created: ", result);
      toast.success("App Created", {
        description: `Successfully created ${data.name}!`,
      });
      onSubmit(data); // close the form
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occurred...",
      });
      console.error("ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                        ? statuses.find((type) => type.value === field.value)
                            ?.label
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
            name="type"
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
                        ? appTypes.find((type) => type.value === field.value)
                            ?.label
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
          name="shortDescription"
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
              <div className="flex gap-2">
                <CustomButton
                  icon={<ZapIcon />}
                  label="Generate"
                  size="small"
                  className="hover:bg-violet-800/30"
                  disabled={isLoading}
                />
                <CustomButton
                  icon={<WandSparklesIcon />}
                  label="Refine"
                  size="small"
                  className="hover:bg-violet-800/30"
                  disabled={isLoading}
                />
                <CustomButton
                  icon={<Maximize2 />}
                  label="Expand"
                  size="small"
                  className="hover:bg-violet-800/30"
                  disabled={isLoading}
                />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <CustomButton
              icon={<XIcon />}
              label="Cancel"
              onClick={onCancel}
              disabled={isLoading}
            />
          </DialogClose>
          <CustomButton
            icon={
              isLoading ? (
                <LoadingSpinner size={16} />
              ) : (
                <PlusIcon className="text-white" />
              )
            }
            type="submit"
            label={isLoading ? "Creating..." : "Create New App"}
            className="bg-green-600 hover:bg-green-600"
            disabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
