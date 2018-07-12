import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'lib/Trekker.js',
    output: {
        file: 'dist.js',
        format: 'cjs',
        name: 'pathify'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: false
        }),
        commonjs()
    ]
}
