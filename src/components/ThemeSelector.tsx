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
      <DialogContent className="max-w-lg border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-3 pb-4">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Choose Your Theme
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              Select an enterprise color palette that matches your style
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(themes).map(([key, themeData]) => {
              const isSelected = currentTheme === key;

              return (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  disabled={isChanging}
                  className={`relative p-2 rounded-lg border-2 transition-all duration-200 text-left group hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex gap-1">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${themeData.gradient} shadow-sm`}
                      />
                      <div
                        className="w-3 h-3 rounded-full opacity-70"
                        style={{
                          backgroundColor: `rgb(${themeData.primaryLight})`,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full opacity-50"
                        style={{
                          backgroundColor: `rgb(${themeData.accent})`,
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 flex-1 text-sm">
                      {themeData.label}
                    </h3>
                    {isSelected && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mb-2">
                    {themeData.description}
                  </p>

                  {/* Theme Demo */}
                  <div className="space-y-1">
                    <div
                      className="h-1.5 rounded-full opacity-80"
                      style={{
                        backgroundColor: `rgb(${themeData.primary})`,
                      }}
                    />
                    <div className="flex gap-1">
                      <div
                        className="h-1 rounded-full flex-1 opacity-60"
                        style={{
                          backgroundColor: `rgb(${themeData.primaryLight})`,
                        }}
                      />
                      <div
                        className="h-1 rounded-full flex-1 opacity-40"
                        style={{
                          backgroundColor: `rgb(${themeData.accent})`,
                        }}
                      />
                    </div>
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

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">
                  Enterprise-Grade Themes
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  All themes feature proper contrast ratios and enterprise
                  design standards. Your selection applies across the entire
                  workspace.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-3">
            <Button
              onClick={handleClose}
              disabled={isChanging}
              className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isChanging ? "Applying..." : "Done"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
