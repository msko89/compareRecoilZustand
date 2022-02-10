import { atom, selector } from 'recoil';

export const historyIndexState = atom({
  key: 'historyIndexState',
  default: -1,
});

export const historyListState = atom({
  key: 'historyListState',
  default: [],
});
