import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button component variants using class-variance-authority
 * Defines different button styles and sizes for consistent UI
 */
const buttonVariants = cva(
  // Base button styles - applied to all variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      // Button style variants
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg",
      },

      // Button size variants
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10", // Square button for icons
        "icon-sm": "h-8 w-8", // Smaller icon button
      },
    },

    // Default variants when none specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Button component props interface
 * Extends HTML button attributes and adds custom variant props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Allows button to be rendered as a different element (like Link)
  asChild?: boolean;
}

/**
 * Reusable Button component with multiple variants and sizes
 *
 * Features:
 * - Multiple style variants (default, outline, ghost, etc.)
 * - Responsive sizing (sm, default, lg, icon)
 * - Accessibility features (focus states, disabled states)
 * - Can render as child component using asChild prop
 * - TypeScript support with proper prop forwarding
 *
 * @param props - Button properties
 * @returns Button component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot for polymorphic rendering when asChild is true
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// Set display name for better debugging
Button.displayName = "Button";

// Export the component and its variants for external use
export { Button, buttonVariants };
