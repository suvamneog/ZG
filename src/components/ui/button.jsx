import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-yellow-600 text-black hover:bg-yellow-500 transition-colors",
    outline: "border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black transition-colors",
    ghost: "text-yellow-400 hover:bg-yellow-600/10 transition-colors",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 transition-colors"
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }