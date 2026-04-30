export const dynamic = "force-dynamic";

import { getPortfolioProjects } from "@/sanity/queries";
import { ProjectsContent } from "./ProjectsContent";

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects();
  return <ProjectsContent projects={projects} />;
}
