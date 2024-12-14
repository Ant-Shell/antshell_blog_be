import 'dotenvx/config';
export const devEnv = {
    database: process.env.DATABASE,
    // database: 'BPDB',
    host: process.env.HOST,
    user: process.env.USER,
    port: Number(process.env.PORT),
    max: Number(process.env.MAX),
    password: process.env.PASSWORD
};
console.log('Database:', devEnv.database);
console.log('User:', devEnv.user);
// console.log("Process.env: ", process.env)
