import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 768, 1440]) {
  for (const theme of ["light", "dark"] as const) {
    test(`${width}px ${theme}: responsive and accessible`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme });
      for (const route of [
        "/",
        "/pt/",
        "/projects/",
        "/pt/projects/",
        "/writing/",
        "/writing/double-spring-pendulum/",
      ]) {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        expect(
          (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
            .violations,
        ).toEqual([]);
        expect(errors).toEqual([]);
      }
    });
  }
}
test("theme persistence, keyboard and article translations", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.getByRole("button", { name: "Use light theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/writing/recovering-a-blurred-image/");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute(
    "href",
    "https://www.goncaloraposo.com/pt/writing/recuperar-uma-imagem-desfocada/",
  );
  await expect(page.locator(".language-toggle")).toHaveAttribute(
    "href",
    "/pt/writing/recuperar-uma-imagem-desfocada/",
  );
  await page.goto("/pt/writing/pendulo-duplo-com-molas/");
  await expect(page.locator(".language-toggle")).toHaveAttribute(
    "href",
    "/writing/double-spring-pendulum/",
  );
  await page.goto("/writing/building-xcos-mcp/");
  await expect(page.locator(".language-toggle")).toHaveAttribute(
    "href",
    "/pt/writing/building-xcos-mcp/",
  );
});
test("blocked storage and reduced motion", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Blocked");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/writing/recovering-a-blurred-image/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Use light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".animation img").first()).toHaveAttribute("src", /poster\.png$/);
  expect(errors).toEqual([]);
});
test("static content works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/pt/");
  await expect(page.getByRole("heading", { name: "Gonçalo Raposo" })).toBeVisible();
  await expect(page.locator(".theme-toggle")).toBeHidden();
  await expect(page.locator(".language-toggle")).toHaveAttribute("href", "/");
  await context.close();
});
test("editorial order, complete migration and private project boundaries", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#work .project-card h3")).toHaveText([
    "Notícias do Dia",
    "Workout Player",
    "Orbit Radar",
    "Split",
    "xcos-mcp",
    "PositNN",
  ]);
  await expect(page.locator("#research h3").first()).toContainText("PositNN");
  await page.goto("/projects/");
  await expect(page.locator('a[href*="autism.goncaloraposo.com"]')).toHaveCount(0);
  await expect(page.locator("#accessibility-card")).toContainText("fictional data");
  await page.goto("/writing/recovering-a-blurred-image/");
  await expect(page.locator(".article-content img")).toHaveCount(17);
  await page.goto("/writing/double-spring-pendulum/");
  await expect(page.locator(".article-content img")).toHaveCount(6);
  await expect(page.locator(".katex-error")).toHaveCount(0);
  await expect(page.locator("pre")).toContainText("def calc_alpha_2");
  await page.goto("/writing/");
  await expect(page.locator('a[href*="building-noticias-do-dia"]')).toHaveCount(0);
  await page.goto("/pt/");
  await expect(page.locator("#writing article h3")).toHaveText([
    "Construir o xcos-mcp",
    "É possível recuperar uma imagem desfocada?",
    "Pêndulo duplo com molas",
  ]);
  await page.goto("/pt/writing/");
  await expect(page.locator("main article")).toHaveCount(3);
});
