import express from 'express';
import envLoader from './env_loader';
import routes from './routes/index';

envLoader();

const app = express();
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
