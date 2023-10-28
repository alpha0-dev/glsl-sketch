import { defineConfig } from "astro/config"
import glsl from "vite-plugin-glsl"
import tailwind from "@astrojs/tailwind"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
	server: {
		host: true,
	},
	vite: {
		plugins: [glsl()],
	},
	integrations: [tailwind(), react()],
})
