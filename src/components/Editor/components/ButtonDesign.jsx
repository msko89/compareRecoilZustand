import React from 'react';
import { BiRectangle, BiSquareRounded, BiCircle } from 'react-icons/bi';
import styled from '@emotion/styled/macro';
import { buttonShapeState } from '../../../store/useButton';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { historyIndexState, historyListState } from '../../../store/useHistory';

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
  color: ${({ buttonShape, value }) =>
    buttonShape === value ? '#fff' : '#2d2f2f'};
  background-color: ${({ buttonShape, value }) =>
    buttonShape === value ? '#2156fa' : '#fff'};
`;

const ButtonDesignText = styled.div`
  color: ${({ buttonShape, value }) =>
    buttonShape === value ? '#fff' : '#2d2f2f'};
  font-size: 14px;
  line-height: 17px;
  margin-top: 2px;
  pointer-events: none;
`;

const buttons = [
  {
    type: 'sharp',
    text: 'Sharp',
  },
  {
    type: 'rounded',
    text: 'Rounded',
  },
  {
    type: 'circle',
    text: 'Circle',
  },
];

const ButtonDesign = () => {
  const [buttonShape, setButtonShape] = useRecoilState(buttonShapeState);
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState);
  const setHistoryList = useSetRecoilState(historyListState);

  const handleButtonShape = (event) => {
    event.stopPropagation();

    const currentButtonShape = event.currentTarget.value;

    setButtonShape(currentButtonShape);

    updateHistoryStore({
      type: 'button',
      kind: 'element',
      prevButtonShape: buttonShape,
      buttonShape: currentButtonShape,
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
          buttonShape={buttonShape}
          value={button.type}
          onClick={handleButtonShape}
        >
          {button.type === 'sharp' ? (
            <BiRectangle size={50} />
          ) : button.type === 'rounded' ? (
            <BiSquareRounded size={50} />
          ) : (
            <BiCircle size={50} />
          )}
          <ButtonDesignText buttonShape={buttonShape} value={button.type}>
            {button.text}
          </ButtonDesignText>
        </Button>
      ))}
    </ButtonDesignLayout>
  );
};

export default ButtonDesign;
