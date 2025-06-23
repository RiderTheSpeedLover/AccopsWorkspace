import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useTheme } from "@/hooks/use-theme";
import {
  Info,
  Keyboard,
  Settings,
  User,
  Lock,
  QrCode,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  Shield,
  Building2,
} from "lucide-react";

const QRCodeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Sign in with QR code
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              Use Accops HyD App to scan and authenticate
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-52 h-52 bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 flex items-center justify-center">
              <div className="w-full h-full bg-gray-900 rounded-lg grid grid-cols-12 gap-px p-3">
                {Array.from({ length: 144 }).map((_, i) => {
                  const isCorner =
                    (i < 24 && i % 12 < 3) ||
                    (i < 24 && i % 12 > 8) ||
                    (i > 119 && i % 12 < 3) ||
                    (i > 119 && i % 12 > 8);
                  const shouldBeFilled = isCorner || Math.random() > 0.45;

                  return (
                    <div
                      key={i}
                      className={`rounded-sm ${shouldBeFilled ? "bg-white" : "bg-gray-900"}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center space-y-3 bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-700">
                QR code refreshes in 24 seconds
              </p>
            </div>
            <p className="text-xs text-green-600">
              Point your camera at the QR code to sign in instantly
            </p>
          </div>

          <Separator />

          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-gray-900">
              Profile not registered?
            </p>
            <p className="text-xs text-gray-600">
              Register your authenticator app to enable QR code login
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Register Device
            </Button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continue with App
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  const handleSignIn = async () => {
    if (username && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate("/two-step-verification");
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username && password) {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      <div className="relative min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-16 xl:px-24 relative overflow-hidden theme-gradient-bg">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-16">
              <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-45"></div>
                <div className="w-3 h-3 bg-white absolute rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">accops</h1>
                <p className="text-blue-100 text-sm uppercase tracking-wider font-medium">
                  Workspace
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Welcome to your
                  <br />
                  <span className="text-blue-200">digital workspace</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Access all your applications, desktops, and resources from
                  anywhere, on any device, with enterprise-grade security.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>Single sign-on with multi-factor authentication</span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>
                    Secure access to virtual applications and desktops
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>Enterprise-grade data protection and compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-32 max-w-2xl mx-auto lg:mx-0">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-7 h-7 bg-white rounded-lg transform rotate-45"></div>
                <div className="w-2 h-2 bg-orange-500 absolute rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">accops</h1>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Workspace
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Sign in to your account
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>Selected organization:</span>
                <span className="font-semibold text-blue-600">accops.com</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-900"
                >
                  Username
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:theme-primary transition-colors" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your username"
                    className="pl-12 h-14 text-base border-gray-200 bg-gray-50/50 focus:bg-white theme-focus transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900"
                >
                  Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:theme-primary transition-colors" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-14 text-base border-gray-200 bg-gray-50/50 focus:bg-white theme-focus transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ accentColor: `rgb(var(--primary))` }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <Button
                  variant="link"
                  className="theme-primary p-0 h-auto text-sm font-medium hover:opacity-80"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                onClick={handleSignIn}
                disabled={!username || !password || isLoading}
                className="w-full h-14 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl border-0 theme-primary-bg theme-primary-hover"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign in
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setShowQRModal(true)}
                  variant="outline"
                  className="h-14 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  QR Code
                </Button>
                <Button
                  variant="outline"
                  className="h-14 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Azure AD
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        <div className="text-xs text-gray-500 font-mono">
          Version 7.1.0.1039
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Information"
          >
            <Info className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Keyboard shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Theme Settings"
            onClick={() => setShowThemeSelector(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />

      <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
