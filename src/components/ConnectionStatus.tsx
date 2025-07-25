import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, Wifi, Globe } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
  onToggleConnection: () => void;
}

export const ConnectionStatus = ({ isConnected, onToggleConnection }: ConnectionStatusProps) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass("animate-pulse");
    const timer = setTimeout(() => setAnimationClass(""), 1000);
    return () => clearTimeout(timer);
  }, [isConnected]);

  return (
    <Card className="p-8 bg-gradient-card border-border/50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <div className={`relative inline-flex ${animationClass}`}>
          {isConnected ? (
            <ShieldCheck className="w-20 h-20 text-vpn-success" />
          ) : (
            <Shield className="w-20 h-20 text-muted-foreground" />
          )}
          {isConnected && (
            <div className="absolute inset-0 rounded-full bg-gradient-glow animate-pulse" />
          )}
        </div>

        <div className="space-y-2">
          <Badge 
            variant={isConnected ? "default" : "outline"}
            className={`text-sm px-4 py-1 ${
              isConnected 
                ? "bg-vpn-success text-foreground" 
                : "text-muted-foreground border-muted"
            }`}
          >
            {isConnected ? "CONNECTED" : "DISCONNECTED"}
          </Badge>
          
          <h2 className="text-2xl font-bold">
            {isConnected ? "You're Protected" : "Click to Connect"}
          </h2>
          
          <p className="text-muted-foreground">
            {isConnected 
              ? "Your connection is secure and private" 
              : "Connect to secure your internet traffic"
            }
          </p>
        </div>

        <Button
          variant="vpn"
          size="lg"
          onClick={onToggleConnection}
          className="w-full max-w-xs h-12 text-base font-semibold"
        >
          {isConnected ? (
            <>
              <Wifi className="w-5 h-5" />
              Disconnect
            </>
          ) : (
            <>
              <Globe className="w-5 h-5" />
              Connect VPN
            </>
          )}
        </Button>

        {isConnected && (
          <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Server</p>
              <p className="font-semibold text-vpn-primary">United States</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">IP Address</p>
              <p className="font-semibold">142.250.191.3</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};