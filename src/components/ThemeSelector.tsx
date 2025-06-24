import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme, themes } from "@/hooks/use-theme";
import { Check, Palette, Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { theme: currentTheme, setTheme } = useTheme();
  const [isChanging, setIsChanging] = React.useState(false);

  // Reset changing state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setIsChanging(false);
    }
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isChanging) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, isChanging, onClose]);

  const handleThemeChange = React.useCallback(
    (themeName: string) => {
      if (isChanging || currentTheme === themeName) return;

      setIsChanging(true);

      // Apply theme immediately
      setTheme(themeName);

      // Reset changing state and provide visual feedback
      const timeoutId = setTimeout(() => {
        setIsChanging(false);
      }, 300);

      // Cleanup function
      return () => clearTimeout(timeoutId);
    },
    [setTheme, currentTheme, isChanging],
  );

  const handleClose = React.useCallback(() => {
    if (!isChanging) {
      onClose();
    }
  }, [isChanging, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-2 pb-3">
          <div className="mx-auto w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Choose Theme
            </DialogTitle>
            <p className="text-xs text-gray-600 mt-1">
              Select your color palette
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(themes).map(([key, themeData]) => {
              const isSelected = currentTheme === key;

              return (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  disabled={isChanging}
                  className={`relative p-1.5 rounded-md border transition-all duration-200 text-left group hover:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-0.5 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeData.gradient}`}
                      />
                      <div
                        className="w-2 h-2 rounded-full opacity-70"
                        style={{
                          backgroundColor: `rgb(${themeData.primaryLight})`,
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full opacity-50"
                        style={{
                          backgroundColor: `rgb(${themeData.accent})`,
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      {themeData.label}
                    </h3>
                    {isSelected && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Selection Overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <Separator />

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-2">
            <div className="text-center">
              <p className="text-xs text-gray-600">
                Enterprise-grade themes with proper contrast ratios
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              onClick={handleClose}
              disabled={isChanging}
              size="sm"
              className="px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isChanging ? "Applying..." : "Done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
