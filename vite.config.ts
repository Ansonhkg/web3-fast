import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This removes the warning from @lit-protocol/logger
      // @lit-protocol_logger…s?v=55a41cd4:171048 Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.Buffer" in client code.
      buffer: "buffer/",
    },
  },
});
