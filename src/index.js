import base from "./base.js";
import react from "./react.js";
import reactNative from "./react-native.js";
import typescript from "./typescript.js";
import vitest from "./vitest.js";

export const configs = {
  base,
  typescript,
  react,
  reactNative,
  vitest,
  // reactNative is opt-in
  all: [...base, ...typescript, ...react, ...vitest],
};

export default configs.all;
