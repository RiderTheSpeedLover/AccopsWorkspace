import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useTheme } from "@/hooks/use-theme";
import {
  User,
  Smartphone,
  Mail,
  Shield,
  Lock,
  Check,
  ArrowRight,
  Settings,
  Info,
  Keyboard,
  Building2,
} from "lucide-react";

export default function TwoStepVerification() {
  const [authMethod, setAuthMethod] = useState("sms");
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetOtp = () => {
    setIsLoading(true);
    setCountdown(30);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleVerify = () => {
    if (otpCode.length === 6) {
      navigate("/dashboard");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      <div className="relative min-h-screen flex">
        {/* Left Panel - Security Messaging */}
        <div
          className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-16 xl:px-24 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgb(var(--primary)), rgb(var(--primary-dark)))`,
          }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                <img
                  src="https://cdn.builder.io/api/v1/assets/b6c85b60348d45f5871b1d3664d56961/accops_logo.653bdac-f95953?format=webp&width=800"
                  alt="Accops Logo"
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wider font-medium">
                  Workspace
                </p>
              </div>
            </div>

            {/* Security Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Enhanced
                  <br />
                  <span className="text-blue-200">Security Protection</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Multi-factor authentication ensures only you can access your
                  workspace, keeping your data and applications secure.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span>Advanced threat protection and monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <span>Zero-trust security architecture</span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>Compliance with industry standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Verification Form */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-32 max-w-2xl mx-auto lg:mx-0">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
              <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                <img
                  src="https://cdn.builder.io/api/v1/assets/b6c85b60348d45f5871b1d3664d56961/accops_logo.653bdac-f95953?format=webp&width=800"
                  alt="Accops Logo"
                  className="h-6 w-auto"
                />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  Workspace
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Two-step verification
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Building2 className="w-4 h-4" />
                <span>Organization:</span>
                <span
                  className="font-semibold"
                  style={{ color: `rgb(var(--primary))` }}
                >
                  accops.com
                </span>
              </div>
              <p className="text-gray-600">
                Please verify your identity to continue securely
              </p>
            </div>

            {/* User Profile Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 ring-4 ring-white shadow-lg">
                  <AvatarFallback
                    className="text-white font-bold text-lg"
                    style={{ backgroundColor: `rgb(var(--primary))` }}
                  >
                    ST
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Sanjeev Tiwari
                  </p>
                  <p className="text-gray-600">sanjeev.tiwari@accops.com</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Authenticated user
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="auth-method"
                  className="text-sm font-medium text-gray-900"
                >
                  Authentication method
                </Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger className="h-14 border-gray-200 bg-gray-50/50 focus:bg-white text-base">
                    <SelectValue placeholder="Choose verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-3 py-1">
                        <Smartphone
                          className="w-5 h-5"
                          style={{ color: `rgb(var(--primary))` }}
                        />
                        <div>
                          <div className="font-medium">SMS Token</div>
                          <div className="text-xs text-gray-500">
                            Send code to mobile
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-3 py-1">
                        <Mail
                          className="w-5 h-5"
                          style={{ color: `rgb(var(--primary))` }}
                        />
                        <div>
                          <div className="font-medium">Email Token</div>
                          <div className="text-xs text-gray-500">
                            Send code to email
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="app">
                      <div className="flex items-center gap-3 py-1">
                        <Shield
                          className="w-5 h-5"
                          style={{ color: `rgb(var(--primary))` }}
                        />
                        <div>
                          <div className="font-medium">Authenticator App</div>
                          <div className="text-xs text-gray-500">
                            Use app-generated code
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGetOtp}
                disabled={countdown > 0 || isLoading}
                className="w-full h-14 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl border-0"
                style={{
                  backgroundColor: `rgb(var(--primary))`,
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = `rgb(var(--primary-dark))`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = `rgb(var(--primary))`;
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending verification code...
                  </div>
                ) : countdown > 0 ? (
                  `Resend code in ${countdown}s`
                ) : (
                  "Send verification code"
                )}
              </Button>

              {/* OTP Input */}
              {countdown > 0 && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <Separator />
                  <div className="space-y-2">
                    <Label
                      htmlFor="otp"
                      className="text-sm font-medium text-gray-900"
                    >
                      Enter 6-digit verification code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otpCode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setOtpCode(value);
                      }}
                      placeholder="000000"
                      className="h-14 text-center text-xl font-mono tracking-wider border-gray-200 bg-gray-50/50 focus:bg-white"
                      maxLength={6}
                      onFocus={(e) => {
                        e.target.style.borderColor = `rgb(var(--primary))`;
                        e.target.style.boxShadow = `0 0 0 3px rgb(var(--primary) / 0.1)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "";
                        e.target.style.boxShadow = "";
                      }}
                    />
                  </div>

                  <div
                    className="text-center p-4 rounded-lg"
                    style={{ backgroundColor: `rgb(var(--accent))` }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: `rgb(var(--primary-dark))` }}
                    >
                      Code sent to{" "}
                      {authMethod === "sms"
                        ? "your mobile number ending in ****67"
                        : authMethod === "email"
                          ? "your email address"
                          : "your authenticator app"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 h-14 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleVerify}
                      disabled={otpCode.length !== 6}
                      className="flex-1 h-14 text-white font-semibold disabled:opacity-50 transition-all duration-200"
                      style={{
                        backgroundColor:
                          otpCode.length === 6
                            ? `rgb(var(--primary))`
                            : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (otpCode.length === 6) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--primary-dark))`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (otpCode.length === 6) {
                          e.currentTarget.style.backgroundColor = `rgb(var(--primary))`;
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        Verify & Continue
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Help Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Having trouble with verification?
                </p>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium"
                >
                  Contact your administrator for assistance
                </Button>
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
