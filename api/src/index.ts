import 'dotenv-flow/config';

import { log } from './utils';
import app from './app';

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.info(`🚀 server started at http://localhost:${PORT}`));
