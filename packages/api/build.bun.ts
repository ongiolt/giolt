await Bun.build({
	entrypoints: ["./src/external/ffi.js"],
	target: "node",
	outdir: "./build/dev/javascript/api/",
	root: "./src",
	env: "inline",
	minify: true,
	throw: false,
});
