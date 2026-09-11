export type Locale = "en" | "pt-PT";

export const locales: Record<Locale, string> = { en: "English", "pt-PT": "Português" };

export function localPath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

export function otherLocalePath(path: string, locale: Locale) {
  if (locale === "en") return path === "/" ? "/pt/" : `/pt${path}`;
  const english = path.replace(/^\/pt(?=\/|$)/, "") || "/";
  return english;
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    date,
  );
}
