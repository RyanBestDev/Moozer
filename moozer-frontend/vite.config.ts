import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(path.resolve(), 'src'),
		},
	},
	build: {
		minify: false, // Disable minification to reduce memory usage
		sourcemap: false, // Disable source maps to save RAM
		chunkSizeWarningLimit: 1000, // Reduce chunk size warning limit
		rollupOptions: {
			maxParallelFileOps: 1, // Limit parallel file operations to reduce RAM usage
			output: {
				manualChunks: undefined, // Avoid excessive chunking
			},
		},
	},
});
