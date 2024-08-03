import OpenAI from 'openai';

import config from '../config/config';

const { apiKey } = config.gpt;
export default new OpenAI({ apiKey });
