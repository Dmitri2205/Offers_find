declare function _exports(env: any): {
    mode: string;
    plugins: any[];
    entry: string;
    module: {
        rules: ({
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    importLoaders: number;
                    postcssOptions?: undefined;
                };
            } | {
                loader: string;
                options: {
                    postcssOptions: {
                        plugins: {}[][];
                    };
                    importLoaders?: undefined;
                };
            } | {
                loader: string;
                options?: undefined;
            })[];
            exclude?: undefined;
            type?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: {
                loader: string;
                options: {
                    presets: string[];
                };
            };
            type?: undefined;
        } | {
            test: RegExp;
            use: string;
            exclude: RegExp;
            type?: undefined;
        } | {
            test: RegExp;
            use: string;
            exclude?: undefined;
            type?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            exclude?: undefined;
        })[];
    };
    resolve: {
        extensions: string[];
        alias: {
            "@modules": string;
            "@styles": string;
            "@API": string;
            "@store": string;
            "@icons": string;
            "@hooks": string;
        };
    };
    output: {
        filename: string;
        path: string;
        assetModuleFilename: string;
        publicPath: string;
    };
    devServer: {
        hot: boolean;
        https: boolean;
        historyApiFallback: boolean;
    };
    devtool: string;
};
export = _exports;
