import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || "id";

  let messages;
  try {
    messages = (await import(`../language/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to default locale
    messages = (await import(`../language/id.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
