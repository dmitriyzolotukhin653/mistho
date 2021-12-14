import mongoose from 'mongoose';

const uri =
  `mongodb+srv://${process.env.MONGODB_BASE_NAME}:${process.env.MONGODB_BASE_PASSWORD}@cluster0.i1ovu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.Promise = Promise;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(uri, () => {
    console.log('db connected')
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
