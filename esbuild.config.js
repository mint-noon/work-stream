require('esbuild').build({
    entryPoints: ['./src/index.ts'],
    outfile: 'lib/wost.js',
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node14'
}).catch(() => process.exit(1))
