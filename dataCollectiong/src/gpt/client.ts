import OpenAI from 'openai';

import config from '../config/config';

const { apiKey } = config;
export default new OpenAI({ apiKey });
