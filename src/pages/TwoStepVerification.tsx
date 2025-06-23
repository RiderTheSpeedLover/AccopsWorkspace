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
import { User, Smartphone, Mail } from "lucide-react";

export default function TwoStepVerification() {
  const [authMethod, setAuthMethod] = useState("sms");
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Logo */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-white rounded-lg transform rotate-45"></div>
              <div className="w-4 h-4 bg-orange-500 absolute rounded-sm"></div>
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold text-gray-900 block">
                accops
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                Workspace
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Verification Form */}
      <div className="flex-1 bg-white flex items-center justify-center border-l border-gray-100">
        <div className="w-full max-w-md px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Two step Verification required
              </h1>
              <p className="text-sm text-gray-600">
                Please verify your identity to continue
              </p>
            </div>

            {/* User Profile */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-blue-100">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    ST
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">Sanjeev Tiwari</p>
                  <p className="text-sm text-gray-600">
                    sanjeev.tiwari@accops.com
                  </p>
                </div>
              </div>
            </div>

            {/* Authentication Method Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="auth-method"
                  className="text-sm font-medium text-gray-700"
                >
                  Select authentication method
                </Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger className="h-12 border-gray-300">
                    <SelectValue placeholder="Choose verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        SMS Token
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Token
                      </div>
                    </SelectItem>
                    <SelectItem value="app">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Authenticator App
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Get OTP Button */}
              <Button
                onClick={handleGetOtp}
                disabled={countdown > 0 || isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : countdown > 0 ? (
                  `Resend OTP in ${countdown}s`
                ) : (
                  "Get OTP"
                )}
              </Button>

              {/* OTP Input */}
              {countdown > 0 && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <Label
                      htmlFor="otp"
                      className="text-sm font-medium text-gray-700"
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
                      className="h-12 text-center text-lg font-mono tracking-wider border-gray-300 focus:border-blue-500"
                      maxLength={6}
                    />
                  </div>

                  <p className="text-xs text-green-600 text-center">
                    OTP sent to{" "}
                    {authMethod === "sms"
                      ? "your mobile number"
                      : authMethod === "email"
                        ? "your email address"
                        : "your authenticator app"}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerify}
                disabled={otpCode.length !== 6}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
              >
                Verify & Continue
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-xs text-gray-500">
              <p>Having trouble? Contact your administrator for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
