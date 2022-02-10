import React from 'react';

import { ImUndo, ImRedo } from 'react-icons/im';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { sectionListState } from '../../store/useSection';
import { historyIndexState, historyListState } from '../../store/useHistory';
import { buttonShapeState } from '../../store/useButton';
import { lineShapeState } from '../../store/useLine';

const Header = () => {
  const [sectionList, setSectionList] = useRecoilState(sectionListState);
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState);
  const historyList = useRecoilValue(historyListState);
  const setButtonShape = useSetRecoilState(buttonShapeState);
  const setLineShape = useSetRecoilState(lineShapeState);

  // console.log(historyIndex, historyList, historyList[historyIndex]);

  const handleUndo = () => {
    const current = historyList[historyIndex];
    if (!current) {
      return;
    }
    setHistoryIndex(historyIndex - 1);

    if (current.kind === 'section') {
      const sectionIdList = historyList
        .slice(0, historyIndex)
        .filter((history) => history.id && history.kind === 'section')
        .map((item) => item.id);

      setSectionList((sectionList) =>
        sectionList.filter((section) => sectionIdList.includes(section.id))
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

    if (current.kind === 'option') {
      if (current.type === 'button') {
        setSectionList((sectionList) =>
          sectionList.map((section) => {
            if (section.id === current.id) {
              return {
                ...section,
                options: {
                  ...section.options,
                  prevButtonAlign:
                    historyList[
                      historyList
                        .slice(0, historyIndex)
                        .findLastIndex((history) => history.id === current.id)
                    ]?.options.prevButtonAlign,
                  buttonAlign:
                    section.options.prevButtonAlign ||
                    section.options.buttonAlign,
                },
              };
            }

            return section;
          })
        );
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
      const sectionIdList = sectionList.map((item) => item.id);

      setSectionList((sectionList) => [
        ...sectionList,
        ...historyList
          .slice(0, nextHistoryIndex + 1)
          .filter((history) => history.id && history.kind === 'section')
          .filter((item) => !sectionIdList.includes(item.id)),
      ]);
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

    if (current.kind === 'option') {
      if (current.type === 'button') {
        setSectionList((sectionList) =>
          sectionList.map((section) => {
            if (section.id === current.id) {
              return {
                ...section,
                options: {
                  ...section.options,
                  prevButtonAlign: current.options.prevButtonAlign,
                  buttonAlign: current.options.buttonAlign,
                },
              };
            }

            return section;
          })
        );
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
