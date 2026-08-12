// The ONLY module that touches the __PORTABLE__ global. Everything else in the
// app imports IS_PORTABLE from here.
//
// `__PORTABLE__` is statically replaced at build time by Vite's `define`:
//   vite.config.js          -> false  (dev, and the hosted dist/ build)
//   vite.config.portable.js -> true   (the single-file offline build)
//
// Keeping it in one place means the test config only needs the define once, and
// a grep for IS_PORTABLE finds every behaviour that differs between the two
// shipping formats.
export const IS_PORTABLE = __PORTABLE__
