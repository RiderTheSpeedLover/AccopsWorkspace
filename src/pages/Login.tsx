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
import { Info, Keyboard, Settings, Monitor } from "lucide-react";

const QRCodeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
              <div className="w-2 h-2 bg-orange-500 absolute"></div>
            </div>
            <DialogTitle className="text-lg font-medium">
              Sign-in with QR code
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-blue-600">
            Use Accops HyD App to scan QR code and login
          </p>

          <div className="flex justify-center py-4">
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg p-3">
              <div className="w-full h-full bg-black rounded grid grid-cols-12 gap-px p-2">
                {Array.from({ length: 144 }).map((_, i) => {
                  // Create a more realistic QR code pattern
                  const isCorner =
                    (i < 24 && i % 12 < 3) ||
                    (i < 24 && i % 12 > 8) ||
                    (i > 119 && i % 12 < 3) ||
                    (i > 119 && i % 12 > 8);
                  const isAlignment =
                    i >= 48 && i <= 95 && i % 12 >= 4 && i % 12 <= 7;
                  const isData = !isCorner && !isAlignment;

                  const shouldBeFilled =
                    isCorner ||
                    (isAlignment && Math.random() > 0.3) ||
                    (isData && Math.random() > 0.4);

                  return (
                    <div
                      key={i}
                      className={`${shouldBeFilled ? "bg-white" : "bg-black"}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-green-600">
              QR code will refresh in 24 seconds
            </p>
            <p className="text-sm font-medium">Profile not registered?</p>
            <p className="text-xs text-gray-600">
              Please click on the register button to register authenticator
              token.
            </p>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              Register
            </Button>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-accops-blue hover:bg-accops-blue-dark"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Login() {
  const [username, setUsername] = useState("sanjeev.tiwari");
  const [password, setPassword] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  const handleQRSignIn = () => {
    setShowQRModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left side - Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded transform rotate-45"></div>
              <div className="w-3 h-3 bg-orange-500 absolute"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">accops</span>
          </div>
          <div className="text-sm text-gray-600">Workspace</div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                Sign-in
              </h1>
              <p className="text-sm text-gray-600">
                Selected organization is{" "}
                <span className="text-blue-600">accops.com</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 text-gray-400">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="pl-10 h-12 border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 text-gray-400">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="pl-10 h-12 border-gray-300"
                  />
                </div>
              </div>

              <div className="text-right">
                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto text-sm"
                >
                  Forgot Password?
                </Button>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSignIn}
                  className="w-full h-12 bg-accops-blue hover:bg-accops-blue-dark text-white font-medium"
                >
                  Sign-in
                </Button>

                <div className="text-center text-sm text-gray-500">or</div>

                <Button
                  onClick={handleQRSignIn}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Sign-in with QR code
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Sign-in with AzureAD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="text-xs text-gray-500">Version: 7.1.0.1039</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
            <Info className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
            <Keyboard className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
}
