export const dynamic = "force-dynamic";

import { getNewsPosts } from "@/sanity/queries";
import { NewsContent } from "./NewsContent";

export default async function NewsPage() {
  const posts = await getNewsPosts();
  return <NewsContent posts={posts} />;
}
