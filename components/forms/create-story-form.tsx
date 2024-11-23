"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  WandSparklesIcon,
  Maximize2,
  XIcon,
  PlusIcon,
  ZapIcon,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";

const storyStatuses = [
  { label: "Not Started", value: "Not Started" },
  { label: "In Progress", value: "In Progress" },
  { label: "Ready for Review", value: "Ready for Review" },
  { label: "Completed", value: "Completed" },
] as const;

const storyTypes = [
  { label: "Feature", value: "feature" },
  { label: "Bug Fix", value: "bugfix" },
  { label: "Technical Debt", value: "tech_debt" },
  { label: "Enhancement", value: "enhancement" },
] as const;

const technicalSpecTypes = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Infrastructure", value: "infrastructure" },
  { label: "Database", value: "database" },
] as const;

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  storyType: z
    .string({ required_error: "Please select a story type." })
    .min(1, { message: "Please select a story type." }),
  techSpecType: z
    .string({ required_error: "Please select a technical specification type." })
    .min(1, { message: "Please select a technical specification type." }),
  userStory: z
    .string()
    .min(10, { message: "User story must be at least 10 characters." }),
  acceptanceCriteria: z.string().min(10, {
    message: "Acceptance criteria must be at least 10 characters.",
  }),
  technicalSpecifications: z.string().optional(),
  taskBreakdown: z.string().optional(),
});

export type TCreateStoryFormData = z.infer<typeof FormSchema>;

interface CreateStoryFormProps {
  featureId: string;
  onSubmit: (data: TCreateStoryFormData) => void;
  onCancel: () => void;
}

export function CreateStoryForm({
  featureId,
  onSubmit,
  onCancel,
}: CreateStoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCreateStoryFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "My Story Name",
      description: "example description for this story",
      status: "Not Started",
      storyType: "feature",
      techSpecType: "fullstack",
      userStory:
        "as a user, i want to do something so that i can achieve a benefit",
      acceptanceCriteria: "list the conditions that must be satisfied",
      technicalSpecifications: "integrate with the backend and frontend",
      taskBreakdown: "create the backend, create the frontend, integrate them",
    },
  });

  const handleSubmit = async (data: TCreateStoryFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/core/story-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          featureId,
          technicalSpecs: data.technicalSpecifications,
          techSpecType: data.techSpecType,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || result.message || "Failed to create user story"
        );
      }

      const result = await response.json();

      toast.success("User Story Created", {
        description: `Successfully created ${result.data.name}!`,
      });
      onSubmit(data);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
      console.error("ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col min-h-[60px]">
                <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                  Story Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter story name..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col min-h-[60px]">
                <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                  Status
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-[200px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? storyStatuses.find(
                            (status) => status.value === field.value
                          )?.label
                        : "Select status..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    {storyStatuses.map((status) => (
                      <Button
                        key={status.value}
                        onClick={() => field.onChange(status.value)}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-green-600",
                            field.value === status.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {status.label}
                      </Button>
                    ))}
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
        </div>

        {/* <Separator /> */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Short Description
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief description of the story..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="storyType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                  Story Type
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-[200px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? storyTypes.find((type) => type.value === field.value)
                            ?.label
                        : "Select type..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    {storyTypes.map((type) => (
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
            name="techSpecType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                  Technical Spec Type
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-[200px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? technicalSpecTypes.find(
                            (type) => type.value === field.value
                          )?.label
                        : "Select type..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    {technicalSpecTypes.map((type) => (
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
          name="userStory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                User Story
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="As a [user type], I want to [action] so that [benefit]..."
                  className="resize-none min-h-[100px]"
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

        <FormField
          control={form.control}
          name="acceptanceCriteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Acceptance Criteria
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the conditions that must be satisfied..."
                  className="resize-none min-h-[100px]"
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

        <FormField
          control={form.control}
          name="technicalSpecifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Technical Specifications
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Technical details and implementation notes..."
                  className="resize-none min-h-[100px]"
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

        <FormField
          control={form.control}
          name="taskBreakdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Task Breakdown
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Break down the implementation into specific tasks..."
                  className="resize-none min-h-[100px]"
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
            label={isLoading ? "Creating..." : "Create User Story"}
            className="bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
