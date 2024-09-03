const mongodb = require('mongodb');
import envLoader from './env_loader';

class DBClient {
  constructor () {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { userUnifiedTopology: True });
    this.client.connect();
  }

  // Checks if connection is active
  isAlive() {
    return this.client.isConnected();
  }

  // Retrieves number of users
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Retrieves number of files in database
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // retrieves a reference to the users
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Retrieves a reference to the files
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

const dbClient = new DBClient();
export default dbClient;
