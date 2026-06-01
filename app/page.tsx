import React from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCourses } from "@/lib/supabase/client";

// Ensure Next.js page always fetches fresh database entries on render
export const revalidate = 0;

export default async function DashboardPage() {
  // 1. DATA FETCHING HAPPENS SOLELY ON THE SERVER SIDE
  // Queries Supabase directly or uses robust fallback mock arrays
  const courses = await getCourses();

  // 2. PASS SERVER DATA SMOOTHLY INTO DYNAMIC CLIENT-SIDE COMPONENT SHELL
  return <DashboardShell courses={courses} />;
}
