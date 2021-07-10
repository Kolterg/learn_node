module.exports = {
    UserIsDelete: 'User is delete!',
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/tasks',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Unknown',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_thn',
    AUTHORIZATION: 'Authorization',
    TEN_M: '10m',
    THIRTY_D: '30d',
    ACCESS: 'access',
};
