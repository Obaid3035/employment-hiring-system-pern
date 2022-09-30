import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server is up and running on ${PORT}`);
  } else {
    console.log('Something is wrong');
  }
});
