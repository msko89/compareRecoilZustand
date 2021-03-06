import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { sectionListState } from '../../store/useSection';
import { historyIndexState, historyListState } from '../../store/useHistory';
import { buttonShapeState } from '../../store/useButton';
import styled from '@emotion/styled/macro';

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  margin-bottom: 20px;
`;

const Panel = () => {
  const setSectionList = useSetRecoilState(sectionListState);
  const setHistoryList = useSetRecoilState(historyListState);
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState);
  const buttonShape = useRecoilValue(buttonShapeState);

  const addButton = () => {
    updateStore({
      id: uuidv4(),
      type: 'button',
      kind: 'section',
      options: {
        buttonShape,
        buttonAlign: 'center',
      },
    });
  };

  const addLine = () => {
    updateStore({
      id: uuidv4(),
      type: 'line',
      kind: 'section',
    });
  };

  const updateStore = (addObject) => {
    setSectionList((sectionList) => [...sectionList, addObject]);
    setHistoryIndex((historyIndex) => historyIndex + 1);

    setHistoryList((historyList) => [
      ...historyList.slice(0, historyIndex + 1),
      addObject,
    ]);
  };

  return (
    <Section>
      <Button onClick={addButton}>Button</Button>
      <Button onClick={addLine}>Line</Button>
    </Section>
  );
};

export default Panel;
