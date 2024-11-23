"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  WandSparklesIcon,
  Maximize2,
  XIcon,
  ZapIcon,
  PlusIcon,
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
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";

const statuses = [
  { label: "Refinement Needed", value: "Refinement Needed" },
  { label: "Ready for Review", value: "Ready for Review" },
  { label: "Ready for Development", value: "Ready for Development" },
] as const;

const featureTypes = [
  { label: "Core Feature", value: "core" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Bug Fix", value: "bugfix" },
  { label: "Performance", value: "performance" },
  { label: "Security", value: "security" },
] as const;

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z
    .string({ required_error: "Please select a status." })
    .min(1, { message: "Please select a status." }),
  featureType: z.string({ required_error: "Please select a feature type." }),
  shortDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  featureSpecs: z.string().optional(),
  storyBreakdown: z.string().optional(),
});

export type TCreateFeatureFormData = z.infer<typeof FormSchema>;

interface CreateFeatureFormProps {
  appId: string;
  onSubmit: (data: TCreateFeatureFormData) => void;
  onCancel: () => void;
}

export function CreateFeatureForm({
  appId,
  onSubmit,
  onCancel,
}: CreateFeatureFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCreateFeatureFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "Refinement Needed",
      featureType: "core",
      featureSpecs: "",
      storyBreakdown: "",
    },
  });

  const handleSubmit = async (data: TCreateFeatureFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/core/feature-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, appId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to create feature");
      }

      const result = await response.json();

      toast.success("Feature Created", {
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Feature Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter feature name..." {...field} />
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
                      className={cn(
                        "justify-between w-[240px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? statuses.find(
                            (status) => status.value === field.value
                          )?.label
                        : "Select a status..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-0">
                    {statuses.map((status) => (
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

          <FormField
            control={form.control}
            name="featureType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                  Feature Type
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-[280px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? featureTypes.find(
                            (type) => type.value === field.value
                          )?.label
                        : "Select feature type..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0">
                    {featureTypes.map((type) => (
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
                  placeholder="Brief overview of the feature..."
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
          name="featureSpecs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Feature Specifications
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed specifications and requirements..."
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
          name="storyBreakdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                Story Breakdown
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Break down the feature into user stories..."
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
            label={isLoading ? "Creating..." : "Create Feature"}
            className="bg-green-600 hover:bg-green-600"
            disabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
