import eslintPluginAstro from "eslint-plugin-astro";
export default [
  ...eslintPluginAstro.configs.recommended,

  {
    files: ["*.astro", "*.js", "*.ts", "*.tsx"],
    processor: "astro/client-side-ts",
    rules: {},
  },
];
