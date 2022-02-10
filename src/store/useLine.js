import { atom, selector } from 'recoil';

export const lineShapeState = atom({
  key: 'lineShapeState',
  default: 'center',
});
