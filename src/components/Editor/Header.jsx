import React from 'react';

import { ImUndo, ImRedo } from 'react-icons/im';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { sectionListState } from '../../store/useSection';
import { historyIndexState, historyListState } from '../../store/useHistory';
import { buttonShapeState } from '../../store/useButton';
import { lineShapeState } from '../../store/useLine';

const Header = () => {
  const setSectionList = useSetRecoilState(sectionListState);
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState);
  const historyList = useRecoilValue(historyListState);
  const setButtonShape = useSetRecoilState(buttonShapeState);
  const setLineShape = useSetRecoilState(lineShapeState);

  console.log(historyIndex, historyList, historyList[historyIndex]);

  const handleUndo = () => {
    const current = historyList[historyIndex];
    if (!current) {
      return;
    }
    setHistoryIndex(historyIndex - 1);
    if (current.kind === 'section') {
      setSectionList(
        historyList.slice(0, historyIndex).filter((history) => history.id)
      );
      return;
    }
    if (current.kind === 'element') {
      if (current.type === 'button') {
        setButtonShape(current.prevButtonShape);
        return;
      }

      if (current.type === 'line') {
        setLineShape(current.prevLineShape);
        return;
      }
    }
  };

  const handleRedo = () => {
    const nextHistoryIndex = historyIndex + 1;
    const current = historyList[nextHistoryIndex];
    if (!current) {
      return;
    }
    setHistoryIndex(nextHistoryIndex);
    if (current.kind === 'section') {
      setSectionList(
        historyList
          .slice(0, nextHistoryIndex + 1)
          .filter((history) => history.id)
      );
      return;
    }
    if (current.kind === 'element') {
      if (current.type === 'button') {
        setButtonShape(current.buttonShape);
        return;
      }

      if (current.type === 'line') {
        setLineShape(current.lineShape);
        return;
      }
    }
  };

  return (
    <header>
      <div className='right'>
        <button
          disabled={!historyList.length || historyIndex === -1}
          onClick={handleUndo}
        >
          <ImUndo />
          <span>Undo</span>
        </button>
        <button
          disabled={historyIndex + 1 === historyList.length}
          onClick={handleRedo}
        >
          <ImRedo />
          <span>Redo</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
