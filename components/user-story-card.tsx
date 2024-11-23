import { SelectUserStory } from "@/db/schema";
import { Card, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { EditStoryForm, TEditStoryFormData } from "./forms/edit-story-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";

interface UserStoryCardProps {
  story: SelectUserStory;
  onStoryUpdate?: () => Promise<void>;
}

export function UserStoryCard({ story, onStoryUpdate }: UserStoryCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();

  const statusStyles = {
    Completed: {
      border: "border-green-600/30 hover:border-green-600/80",
      text: "text-green-400",
    },
    "In Progress": {
      border: "border-sky-600/30 hover:border-sky-600/80",
      text: "text-sky-400",
    },
    "Not Started": {
      border: "border-purple-600/30 hover:border-purple-600/80",
      text: "text-purple-400",
    },
    "Ready for Review": {
      border: "border-orange-600/30 hover:border-orange-600/80",
      text: "text-orange-400",
    },
  } as const;

  const currentStyles = statusStyles[
    story.status as keyof typeof statusStyles
  ] ?? {
    border: "border-zinc-600/30 hover:border-zinc-600/80",
    text: "text-zinc-400",
  };

  const handleEditSuccess = async (data: TEditStoryFormData) => {
    setIsEditDialogOpen(false);
    if (onStoryUpdate) {
      await onStoryUpdate();
    }
    router.refresh();
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Card
          className={`group relative space-y-2 justify-between flex py-6 hover:opacity-90 border-2 ${currentStyles.border} bg-black/50 rounded-2xl shadow-md transition-all h-52 px-7 cursor-pointer`}
        >
          <div className="flex flex-col justify-between gap-4 w-96">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-lg line-clamp-1 break-all">
                {story.name}
              </h3>
              <CardDescription className="opacity-70 line-clamp-2 break-words overflow-hidden">
                {story.description}
              </CardDescription>
            </div>
            <p
              className={`opacity-90 group-hover:opacity-100 text-xs font-mono mt-2 uppercase tracking-wider ${currentStyles.text} transition-opacity`}
            >
              {story.status}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit User Story</DialogTitle>
        </DialogHeader>
        <EditStoryForm
          storyId={story.id}
          initialData={{
            name: story.name,
            description: story.description,
            status: story.status,
            storyType: story.storyType,
            technicalSpecType: story.technicalSpecType,
            userStory: story.userStory,
            acceptanceCriteria: story.acceptanceCriteria,
            technicalSpecifications: story.technicalSpecs ?? undefined,
            taskBreakdown: story.taskBreakdown ?? undefined,
          }}
          onSubmit={handleEditSuccess}
          onCancel={() => setIsEditDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
