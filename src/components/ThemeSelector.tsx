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

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
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

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(themes).map(([key, themeData]) => {
              const isSelected = currentTheme === key;

              return (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:shadow-lg ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex gap-1">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${themeData.gradient} shadow-sm`}
                      />
                      <div
                        className="w-4 h-4 rounded-full opacity-70"
                        style={{
                          backgroundColor: `rgb(${themeData.primaryLight})`,
                        }}
                      />
                      <div
                        className="w-4 h-4 rounded-full opacity-50"
                        style={{
                          backgroundColor: `rgb(${themeData.accent})`,
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 flex-1">
                      {themeData.label}
                    </h3>
                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {themeData.description}
                  </p>

                  {/* Theme Demo */}
                  <div className="space-y-2">
                    <div
                      className="h-2 rounded-full opacity-80"
                      style={{
                        backgroundColor: `rgb(${themeData.primary})`,
                      }}
                    />
                    <div className="flex gap-1">
                      <div
                        className="h-1.5 rounded-full flex-1 opacity-60"
                        style={{
                          backgroundColor: `rgb(${themeData.primaryLight})`,
                        }}
                      />
                      <div
                        className="h-1.5 rounded-full flex-1 opacity-40"
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

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Enterprise-Grade Themes
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All themes are designed with accessibility in mind, featuring
                  proper contrast ratios and following enterprise design
                  standards. Your selection will be saved and applied across the
                  entire workspace.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={onClose}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
