import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  TOKEN: string;
}

const handler = {
  get: function (_: IConfig, name: string) {
    return process.env[name];
  }
};

const config = new Proxy({} as IConfig, handler);

export default config;