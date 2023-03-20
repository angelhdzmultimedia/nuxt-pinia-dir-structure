import express from 'express';
import { Application, Response, Request } from 'express';

const app: Application = express();

app.listen(5000, () => {
  console.log('Server listening on port 5000...');
});
