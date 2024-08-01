import { defineConfig } from "vite";
import { glob } from "glob";
import react from "@vitejs/plugin-react";

const input = (await glob("src/**/*.html"))
	.map((path) => {
		return [path.replace(/^src\//, "").replace(/\.html$/, ""), path] as const;
	})
	.reduce(
		(map, keyValue) => {
			map[keyValue[0]] = keyValue[1];
			return map;
		},
		{} as { [entryAlias: string]: string },
	);

export default defineConfig({
	plugins: [react()],
	server: {
		open: "/index.html",
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		rollupOptions: { input },
	},
	css: {
		transformer: "lightningcss",
	},
	root: "src",
});
