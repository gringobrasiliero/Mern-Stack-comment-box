const secrets = {
  dbUri: process.env.DB_URI
};

export const getSecret = key => secrets[key];

mongodb://<dbuser>:<dbpassword>@ds127490.mlab.com:27490/form-box-testing-mongo
