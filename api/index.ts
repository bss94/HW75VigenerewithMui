import express from 'express';
import cors from 'cors';
import { vigenereCipher } from './cipher';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/encode', (req, res) => {
  const password: string = req.body.password;
  const message: string = req.body.message;
  const cipherText = vigenereCipher(message, password, true);
  return res.send({encoded: cipherText});
});

app.post('/decode', (req, res) => {
  const password: string = req.body.password;
  const message: string = req.body.message;
  const plainText = vigenereCipher(message, password, false);
  return res.send({decoded: plainText});
});

const run = async () => {

  app.listen(port, () =>
    console.log(`Server started on port ${port}`));

};
run().catch(console.error);