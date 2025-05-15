await Bun.build({
	entrypoints: ["./src/external/ffi.js"],
	target: "browser",
	outdir: "./build/dev/javascript/api/external/",
	root: "./src",
});
