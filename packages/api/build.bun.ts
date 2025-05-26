await Bun.build({
	entrypoints: ["./src/external/ffi.ts"],
	target: "browser",
	outdir: "./build/dev/javascript/api/",
	root: "./src",
	env: "inline",
	minify: true,
	throw: false,
});
