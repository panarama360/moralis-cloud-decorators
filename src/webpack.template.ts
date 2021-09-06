import * as path from 'path';
import * as webpack from 'webpack';

const webpackConfigMoralisTemplate: webpack.Configuration = {
    mode: 'production',
    entry: './index.ts',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts'],
        alias: {

        }
    },
    externals: {
        'moralis/node': 'Moralis'
    },
};

export default webpackConfigMoralisTemplate;
