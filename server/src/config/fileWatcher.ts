import chokidar from "chokidar";
import path from "path";

const watcher = chokidar.watch(path.join(__dirname, "../../db"), {
  persistent: true,
});

watcher.on("add", (filePath: string) => {
  console.log(`New file added: ${filePath}`);
});

watcher.on("unlink", (filePath: string) => {
  console.log(`File removed: ${filePath}`);
});

watcher.on("error", (error: any) => {
  console.error("Error watching files:", error);
});
