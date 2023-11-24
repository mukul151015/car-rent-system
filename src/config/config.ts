const config={
    dbConfig: {
        username: "postgres",
        password: "root",
        database: "mydb",
        host:'localhost',
        port: 5432,
        dialect: 'postgres',
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: true,
        },
      },


  authConfig: {
    tokenExpiry: 2592000,
    secretKey: process.env.JWT_SECRET_KEY,
     hashSaltRounds: 8,
},
serverConfig: {
  PORT: process.env.SERVER_PORT,
  env: process.env.NODE_ENV,
},
redisConfig: {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
},
secret: process.env.APP_SECRET,


}

export{config}