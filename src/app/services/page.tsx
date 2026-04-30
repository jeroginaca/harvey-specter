export const dynamic = "force-dynamic";

import { getServices } from "@/sanity/queries";
import { ServicesContent } from "./ServicesContent";

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesContent services={services} />;
}
