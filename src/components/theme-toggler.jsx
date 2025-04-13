"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer">
            <Sun className="transition-all dark:hidden" />
            <Moon className="hidden transition-all dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
