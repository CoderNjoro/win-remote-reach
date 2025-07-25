import { useState, useEffect } from "react";
import { ConnectionStatus } from "./ConnectionStatus";
import { ServerList } from "./ServerList";
import { ConnectionStats } from "./ConnectionStats";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Info, Shield } from "lucide-react";
import heroImage from "@/assets/vpn-hero.jpg";

export const VPNDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState("1");
  const [connectionTime, setConnectionTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const handleSelectServer = (serverId: string) => {
    setSelectedServer(serverId);
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-vpn rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-vpn bg-clip-text text-transparent">
                WinRemoteReach VPN
              </h1>
              <p className="text-sm text-muted-foreground">Secure • Private • Fast</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="vpn-ghost" size="icon">
              <Info className="w-4 h-4" />
            </Button>
            <Button variant="vpn-ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="relative h-48 lg:h-64">
            <img 
              src={heroImage} 
              alt="VPN Security" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center">
              <div className="p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Your Digital Privacy Guardian
                </h2>
                <p className="text-muted-foreground lg:text-lg max-w-md">
                  Protect your online identity with military-grade encryption and global server network.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Connection Status */}
          <div className="lg:col-span-1">
            <ConnectionStatus 
              isConnected={isConnected}
              onToggleConnection={handleToggleConnection}
            />
          </div>

          {/* Server List */}
          <div className="lg:col-span-1">
            <ServerList 
              selectedServer={selectedServer}
              onSelectServer={handleSelectServer}
            />
          </div>

          {/* Statistics */}
          <div className="lg:col-span-1">
            <ConnectionStats isConnected={isConnected} />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 p-6 bg-gradient-card border-border/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="vpn-outline" size="sm">
              Kill Switch: {isConnected ? "ON" : "OFF"}
            </Button>
            <Button variant="vpn-outline" size="sm">
              Auto-Connect: ON
            </Button>
            <Button variant="vpn-outline" size="sm">
              Protocol: OpenVPN
            </Button>
            <Button variant="vpn-outline" size="sm">
              DNS Leak Protection
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>WinRemoteReach VPN • Trusted by millions worldwide</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span>24/7 Support</span>
            <span>•</span>
            <span>No Logs Policy</span>
            <span>•</span>
            <span>30-Day Money Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};