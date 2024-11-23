"use client";

import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  XIcon,
  Check,
  ChevronsUpDown,
  WandSparklesIcon,
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
import { LoadingSpinner } from "@/components/loading-spinner";

const statuses = [
  { label: "Not Started", value: "not_started" },
  { label: "In Progress", value: "in_progress" },
  { label: "Ready for Review", value: "ready_for_review" },
] as const;

const featureTypes = [
  { label: "Core Feature", value: "core" },
  { label: "Enhancement", value: "enhancement" },
  { label: "UI Component", value: "ui" },
  { label: "API Integration", value: "api" },
  { label: "Infrastructure", value: "infrastructure" },
] as const;

const FormSchema = z.object({
  appId: z.string(),
  appName: z
    .string()
    .min(2, { message: "App name must be at least 2 characters." }),
  status: z.string({ required_error: "Please select a status." }),
  type: z.string({ required_error: "Please select a feature type." }),
  specifications: z.string().min(20, {
    message: "Specifications must be at least 20 characters.",
  }),
  featureBreakdown: z.string().min(20, {
    message: "Feature breakdown must be at least 20 characters.",
  }),
});

export type TMultipleFeaturesFormData = z.infer<typeof FormSchema>;

interface MultipleFeaturesFormProps {
  appId: string;
  onSubmit: (data: TMultipleFeaturesFormData) => void;
  onCancel: () => void;
  onFormChange?: (isDirty: boolean) => void;
}

export function MultipleFeaturesForm({
  appId,
  onSubmit,
  onCancel,
  onFormChange,
}: MultipleFeaturesFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TMultipleFeaturesFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      appId,
      appName: "",
      status: "not_started",
      type: "core",
      specifications: "",
      featureBreakdown: "",
    },
  });

  useEffect(() => {
    onFormChange?.(form.formState.isDirty);
  }, [form.formState.isDirty, onFormChange]);

  async function handleSubmit(data: TMultipleFeaturesFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/core/features", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate features");
      }

      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="appName"
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
                      className={cn(
                        "justify-between w-[240px]",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      {field.value
                        ? statuses.find(
                            (status) => status.value === field.value
                          )?.label
                        : "Select status..."}
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
            name="type"
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
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-400 font-mono uppercase tracking-widest text-xs">
                High-Level Specifications
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the features you want to generate..."
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
                Feature Breakdown
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the specific features to be generated..."
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
            label={isLoading ? "Generating..." : "Generate Features"}
            className="bg-green-600 hover:bg-green-600"
            disabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}
