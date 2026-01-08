import fs from 'fs/promises';
import path from 'path';

export const getUI = async (_, res) => {
  const data = JSON.parse(
    await fs.readFile(path.resolve('data/user.json'), 'utf-8')
  );
  res.json(data);
};
