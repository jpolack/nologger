module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    rootDir: '.',
    testPathIgnorePatterns: [
        './node_modules/',
    ],
    testRegex: '.*.spec.(ts)',
};
