import process from "node:process";
import path from "node:path";
import sharp from "sharp";

// Markdown uses portable site-root paths; previews add their base at build time.
export default function localAssets() {
  return async (tree) => {
    const base = (process.env.SITE_BASE || "/").replace(/\/$/, "");
    async function walk(node) {
      if (node.type === "element") {
        const props = (node.properties ??= {});
        if (Array.isArray(props.className) && props.className.includes("katex-display"))
          props.tabIndex = 0;
        if (
          node.tagName === "img" &&
          typeof props.src === "string" &&
          props.src.startsWith("/") &&
          !props.src.startsWith("//")
        ) {
          const file = path.join(process.cwd(), "public", props.src);
          const metadata = await sharp(file).metadata();
          props.width = metadata.width;
          props.height = metadata.pageHeight ?? metadata.height;
          props.loading = "lazy";
          props.decoding = "async";
          if (props.src.endsWith(".gif")) {
            const animation = props.src;
            props.src = props.src.replace(/\.gif$/, "-poster.png");
            node.tagName = "span";
            node.properties = { className: ["animation"] };
            node.children = [
              { type: "element", tagName: "img", properties: props, children: [] },
              {
                type: "element",
                tagName: "button",
                properties: {
                  type: "button",
                  hidden: true,
                  "data-animation": `${base}${animation}`,
                  "aria-pressed": "false",
                },
                children: [{ type: "text", value: "Play animation" }],
              },
            ];
          }
        }
        for (const key of ["href", "src", "poster"]) {
          const value = node.properties[key];
          if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//"))
            node.properties[key] = `${base}${value}`;
        }
      }
      await Promise.all((node.children ?? []).map(walk));
    }
    await walk(tree);
  };
}
