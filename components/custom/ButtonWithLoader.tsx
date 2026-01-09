import React from "react"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonWithLoaderProps extends ButtonProps {
    loading?: boolean
    loadingText?: string
}

const ButtonWithLoader = React.forwardRef<HTMLButtonElement, ButtonWithLoaderProps>(
    ({ className, disabled, loading, children, loadingText, ...props }, ref) => {
        return (
            <Button
                className={cn(className)}
                disabled={loading || disabled}
                ref={ref}
                {...props}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingText || children}
                    </>
                ) : (
                    children
                )}
            </Button>
        )
    }
)

ButtonWithLoader.displayName = "ButtonWithLoader"

export default ButtonWithLoader
