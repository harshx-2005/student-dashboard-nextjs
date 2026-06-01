export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface DashboardStats {
  learningStreak: number;
  totalHours: number;
  activeCourses: number;
  overallProgress: number;
}

export type SidebarTab = "dashboard" | "courses" | "activity" | "settings";

export interface SidebarItem {
  id: SidebarTab;
  label: string;
  iconName: string;
}
