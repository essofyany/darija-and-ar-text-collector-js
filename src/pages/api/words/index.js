import Word from '../../../models/word';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { words, type } = req.body;
      const isExist = await Word.findOne({ text: words });
      console.log("isExist: ", isExist);
      if (words?.length > 0 && !isExist) {
        words.map(async (word) => {
          await new Word({
            text: word,
            type,
          }).save();
        });
      }
      res.status(201).json({
        message: 'this word has been labeled successfully',
      });
    }
  } catch (err) {
    console.log('Words Route Err', err);
    res.status(500).json({
      message: 'Server Error',
    });
  }
}
