

module.exports = {
    entry: {
        app: ['core-js/fn/promise','./src/Main.ts']
    },
    resolve:
        {
            extensions: ['.ts', '.js']
        },
    module: {
        rules:
            [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
    }
};

