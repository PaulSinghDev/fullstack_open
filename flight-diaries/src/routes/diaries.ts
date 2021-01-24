import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const diariesRouter = express.Router();

diariesRouter.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

diariesRouter.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  return diary ? res.send(diary) : res.sendStatus(404);
});

diariesRouter.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedDiaryEntry = diaryService.addEntry(newDiaryEntry);
    res.json(addedDiaryEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default diariesRouter;
