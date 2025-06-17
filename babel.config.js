module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@/components": "./src/components",
            "@/contexts": "./src/contexts",
            "@/services": "./src/services",
            "@/types": "./src/types",
            "@/utils": "./src/utils",
            "@/hooks": "./src/hooks",
            "@/constants": "./src/constants",
            "@/assets": "./assets",
            "@/data": "./src/data",
            "@/config": "./src/config",
          },
        },
      ],
    ],
  };
};
