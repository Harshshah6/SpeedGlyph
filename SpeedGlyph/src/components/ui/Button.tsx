import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "rounded-custom border-custom", // Base brutalism styles
          // Variants
          variant === 'default' && "bg-[color:var(--color-text)] text-[color:var(--color-background)] hover:shadow-custom hover:-translate-x-[2px] hover:-translate-y-[2px]",
          variant === 'accent' && "bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)] hover:shadow-custom hover:-translate-x-[2px] hover:-translate-y-[2px]",
          variant === 'destructive' && "bg-[color:var(--color-danger)] text-white border-[color:var(--color-danger)] hover:shadow-custom hover:-translate-x-[2px] hover:-translate-y-[2px]",
          variant === 'outline' && "border-[color:var(--color-border)] bg-transparent hover:bg-[color:var(--color-surface)] hover:shadow-custom hover:-translate-x-[2px] hover:-translate-y-[2px]",
          variant === 'secondary' && "bg-[color:var(--color-surface)] text-[color:var(--color-text)] hover:shadow-custom hover:-translate-x-[2px] hover:-translate-y-[2px]",
          variant === 'ghost' && "border-transparent hover:bg-[color:var(--color-border)] hover:text-[color:var(--color-text)]",
          variant === 'link' && "border-transparent text-primary underline-offset-4 hover:underline",
          // Sizes
          size === 'default' && "h-10 px-4 py-2 text-sm",
          size === 'sm' && "h-9 px-3 text-xs",
          size === 'lg' && "h-11 px-8 text-base",
          size === 'icon' && "h-10 w-10",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
