import generator from 'generate-password';

const password = generator.generate({
  length: 7,
  numbers: true,
});
export default password;
