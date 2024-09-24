import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const WixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: import.meta.env.WIX_CLIENT_ID,
  }),
});

export default async function fetchArticles({
  count = null,
  featured = false,
} = {}) {
  let query = WixClient.items.queryDataItems({
    dataCollectionId: "Articles",
  });

  if (count !== null) {
    query = query.limit(count);
  }

  if (featured) {
    query = query.eq("featured", true);
  }

  const articles = await query.find();
  return articles.items;
}
