import { Card } from "@/components/ui/card";
import { Download, Upload, Clock, Shield } from "lucide-react";

interface ConnectionStatsProps {
  isConnected: boolean;
}

export const ConnectionStats = ({ isConnected }: ConnectionStatsProps) => {
  const stats = isConnected
    ? {
        downloadSpeed: "45.7 Mbps",
        uploadSpeed: "12.3 Mbps",
        uptime: "02:34:17",
        dataUsed: "2.4 GB",
      }
    : {
        downloadSpeed: "0 Mbps",
        uploadSpeed: "0 Mbps", 
        uptime: "00:00:00",
        dataUsed: "0 GB",
      };

  const statItems = [
    {
      icon: Download,
      label: "Download",
      value: stats.downloadSpeed,
      color: "text-vpn-primary",
    },
    {
      icon: Upload,
      label: "Upload", 
      value: stats.uploadSpeed,
      color: "text-vpn-secondary",
    },
    {
      icon: Clock,
      label: "Uptime",
      value: stats.uptime,
      color: "text-vpn-success",
    },
    {
      icon: Shield,
      label: "Data Used",
      value: stats.dataUsed,
      color: "text-foreground",
    },
  ];

  return (
    <Card className="p-6 bg-gradient-card border-border/50 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4">Connection Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <div className={`p-2 rounded-lg bg-secondary/50 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`font-semibold ${isConnected ? stat.color : "text-muted-foreground"}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isConnected && (
        <div className="mt-4 p-3 rounded-lg bg-vpn-primary/10 border border-vpn-primary/20">
          <div className="flex items-center gap-2 text-vpn-primary">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Secure Connection Active</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            All traffic encrypted with AES-256
          </p>
        </div>
      )}
    </Card>
  );
};