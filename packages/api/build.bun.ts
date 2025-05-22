await Bun.build({
	entrypoints: ["./src/external/ffi.js"],
	target: "browser",
	outdir: "./build/dev/javascript/api/",
	root: "./src",
	env: "inline",
	minify: true,
	throw: false,
});
