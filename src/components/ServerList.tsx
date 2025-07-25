import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Clock } from "lucide-react";

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  isRecommended?: boolean;
}

const servers: Server[] = [
  { id: "1", country: "United States", city: "New York", flag: "🇺🇸", ping: 12, load: 23, isRecommended: true },
  { id: "2", country: "United Kingdom", city: "London", flag: "🇬🇧", ping: 34, load: 45 },
  { id: "3", country: "Germany", city: "Berlin", flag: "🇩🇪", ping: 28, load: 67 },
  { id: "4", country: "Japan", city: "Tokyo", flag: "🇯🇵", ping: 156, load: 34 },
  { id: "5", country: "Canada", city: "Toronto", flag: "🇨🇦", ping: 45, load: 12 },
  { id: "6", country: "Australia", city: "Sydney", flag: "🇦🇺", ping: 234, load: 56 },
];

interface ServerListProps {
  selectedServer: string;
  onSelectServer: (serverId: string) => void;
}

export const ServerList = ({ selectedServer, onSelectServer }: ServerListProps) => {
  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-vpn-success";
    if (ping < 100) return "text-vpn-warning";
    return "text-vpn-danger";
  };

  const getLoadColor = (load: number) => {
    if (load < 30) return "bg-vpn-success";
    if (load < 70) return "bg-vpn-warning";
    return "bg-vpn-danger";
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-vpn-primary" />
          <h3 className="text-lg font-semibold">Server Locations</h3>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          {servers.map((server) => (
            <Button
              key={server.id}
              variant={selectedServer === server.id ? "vpn" : "ghost"}
              className="w-full justify-between h-auto p-4 hover:bg-secondary/50"
              onClick={() => onSelectServer(server.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{server.flag}</span>
                <div className="text-left">
                  <div className="font-medium flex items-center gap-2">
                    {server.country}
                    {server.isRecommended && (
                      <Badge variant="outline" className="text-xs border-vpn-primary text-vpn-primary">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{server.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Wifi className="w-4 h-4" />
                  <span className={getPingColor(server.ping)}>{server.ping}ms</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getLoadColor(server.load)}`}
                      style={{ width: `${server.load}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{server.load}%</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};