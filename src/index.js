
import config from './config/config';
import app from './config/express';

const http = require('http');

if (!module.parent) {
  // listen on port config.port
  http.createServer(app)
    .listen(process.env.PORT || config.port, () => {
      console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
    });
}

export default app;

