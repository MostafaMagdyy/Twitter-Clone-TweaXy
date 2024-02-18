module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '\\.pnp\\.[^\\/]+$',
        '\\.jpeg$',
    ],

    moduleNameMapper: {
        '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|html)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
};
