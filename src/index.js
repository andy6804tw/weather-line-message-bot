import config from './config/config';
import app from './config/express';
import express from 'express';

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
  });
}
app.use(express.static('public'));

export default app;

