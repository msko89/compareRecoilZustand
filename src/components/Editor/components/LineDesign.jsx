import React from 'react';
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from 'react-icons/ai';
import styled from '@emotion/styled/macro';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { historyIndexState, historyListState } from '../../../store/useHistory';
import { lineShapeState } from '../../../store/useLine';

const ButtonDesignLayout = styled.div`
  display: flex;
  height: 80px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
`;

const Button = styled.button`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 200px;
  color: ${({ lineShape, value }) =>
    lineShape === value ? '#fff' : '#2d2f2f'};
  background-color: ${({ lineShape, value }) =>
    lineShape === value ? '#2156fa' : '#fff'};
`;

const ButtonDesignText = styled.div`
  color: ${({ lineShape, value }) =>
    lineShape === value ? '#fff' : '#2d2f2f'};
  font-size: 14px;
  line-height: 17px;
  margin-top: 2px;
  pointer-events: none;
`;

const buttons = [
  {
    type: 'left',
    text: 'Left',
  },
  {
    type: 'center',
    text: 'Center',
  },
  {
    type: 'right',
    text: 'Right',
  },
];

const LineDesign = () => {
  const [lineShape, setLineShape] = useRecoilState(lineShapeState);
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState);
  const setHistoryList = useSetRecoilState(historyListState);

  const handleButtonShape = (event) => {
    event.stopPropagation();

    const currentLineShape = event.currentTarget.value;

    setLineShape(currentLineShape);

    updateHistoryStore({
      type: 'line',
      kind: 'element',
      prevLineShape: lineShape,
      lineShape: currentLineShape,
    });
  };

  const updateHistoryStore = (addOption) => {
    setHistoryIndex(historyIndex + 1);
    setHistoryList((historyList) => [...historyList, addOption]);
  };

  return (
    <ButtonDesignLayout>
      {buttons.map((button) => (
        <Button
          key={button.type}
          lineShape={lineShape}
          value={button.type}
          onClick={handleButtonShape}
        >
          {button.type === 'left' ? (
            <AiOutlineAlignLeft size={50} />
          ) : button.type === 'center' ? (
            <AiOutlineAlignCenter size={50} />
          ) : (
            <AiOutlineAlignRight size={50} />
          )}
          <ButtonDesignText lineShape={lineShape} value={button.type}>
            {button.text}
          </ButtonDesignText>
        </Button>
      ))}
    </ButtonDesignLayout>
  );
};

export default LineDesign;
