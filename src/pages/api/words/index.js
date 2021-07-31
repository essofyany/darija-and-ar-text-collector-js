import Word from '../../../models/word';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { words, type } = req.body;
      if (words.length > 0) {
        try {
          words.map(async (word) => {
            await new Word({
              text: word,
              type,
            }).save();
          });
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({
        message: 'success',
      });
    }
  } catch (err) {
    console.log('Words Route Err', err);
    res.status(500).json({
      message: 'Server Error',
    });
  }
}
