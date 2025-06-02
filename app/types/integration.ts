export interface Integration {
  id: number;
  integration_name: string;
  status: string;
  created: string;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
} 