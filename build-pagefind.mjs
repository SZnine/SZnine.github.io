import { cpSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { close, createIndex } from "pagefind";

// These directories contain generated indexes, including copies from older builds.
rmSync("dist/pagefind", { recursive: true, force: true });
rmSync("public/pagefind", { recursive: true, force: true });

const hasArticles = readdirSync("dist", { recursive: true })
  .filter(path => path.endsWith(".html"))
  .some(path =>
    readFileSync(join("dist", path), "utf8").includes(" data-pagefind-body")
  );

// Pagefind cannot write a zero-page index. Start indexing with the first post.
if (hasArticles) {
  try {
    const { index, errors } = await createIndex();
    if (errors.length || !index) {
      throw new Error(errors.join("\n") || "Could not create Pagefind index");
    }

    const indexed = await index.addDirectory({ path: "dist" });
    if (indexed.errors.length) throw new Error(indexed.errors.join("\n"));

    const written = await index.writeFiles({ outputPath: "dist/pagefind" });
    if (written.errors.length) throw new Error(written.errors.join("\n"));

    cpSync("dist/pagefind", "public/pagefind", { recursive: true, force: true });
  } finally {
    await close();
  }
}
