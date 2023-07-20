module.exports = {
    preset: 'ts-jest', //Indica que estamos utilizando TypeScript con Jest.
    testEnvironment: 'node', //Especifica el entorno de prueba (Node.js en este caso)
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], //Patrones para encontrar archivos de prueba
};