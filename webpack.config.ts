import * as path from 'path';
import * as webpack from 'webpack';
import webpackConfigMoralisTemplate from "./src/webpack.template";


const config: webpack.Configuration = {

    ...webpackConfigMoralisTemplate,
    context: path.resolve(__dirname),
    entry: './example/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
};

export default config;
