import { Moon, Sun, ShieldCheck } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0f1930] bg-[#060e20]/80 backdrop-blur-[20px] transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[#22c55e]" />
          <span className="text-xl font-bold tracking-tight text-[#dee5ff] font-['Manrope']">
            TruthCheck
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-[#a3aac4] hover:text-[#dee5ff] hover:bg-[#0f1930]"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
