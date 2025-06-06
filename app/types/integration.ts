export interface Integration {
  name: string;
  type: string;
  connect_url: string;
  activities_url: string;
  status: string;
}

export interface ConnectResponse {
  redirect_url: string;
}


export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
} 