# Shadcn Instructions

Use this guide for frontend component work in the project.

It uses Next.js, Tailwind, Shadcn, and Framer Motion.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish whatever the user asks for

## Steps

- Build needed components using Shadcn UI
- Import the components into the project like this:

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
```

- Modify globals.css for any css variables that should be applied globally to the shadcn theme
- Directly modify the underlying component in '/components/ui' if you need to override the default / global styles

## Reminders

- Always import the components using the '@' alias to easily and cleanly access the 'components/ui' folder
- 'Use prompts/tools/v0.md' only if asked to for creating more complex UI with shadcn
- When animating components, use Framer Motion

## Requirements

- useRouter should be imported from next/navigation
