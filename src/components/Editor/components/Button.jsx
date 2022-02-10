import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { buttonShapeState } from '../../../store/useButton';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { sectionListState } from '../../../store/useSection';
import { historyIndexState, historyListState } from '../../../store/useHistory';
import {
  MdOutlineAlignHorizontalLeft,
  MdOutlineAlignHorizontalCenter,
  MdOutlineAlignHorizontalRight,
} from 'react-icons/md';

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  width: 300px;
  justify-content: ${({ buttonAlign }) => buttonAlign};
`;

const ButtonLayout = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin: 50px 0;
  border-radius: ${({ buttonShape }) =>
    buttonShape === 'circle' ? '50%' : buttonShape === 'rounded' ? '20%' : 0};

  &:before {
    display: ${({ isMouseEnter, isClick }) =>
      (!isMouseEnter || isClick) && 'none'};
    position: absolute;
    width: 150px;
    top: -25px;
    left: -25px;
    right: -25px;
    bottom: -25px;
    border: 2px solid red;
    content: '';
    cursor: pointer;
  }
`;

const ButtonLink = styled.a`
  display: block;
  height: 100%;
`;

const ButtonText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonOptionLayout = styled.div`
  position: absolute;
  top: -10px;
  display: ${({ isMouseEnter, isClick }) => (isClick ? 'flex' : 'none')};
  align-items: center;
  height: 50px;
  border-radius: 0;
  box-shadow: 0 4px 16px rgb(0 0 0 / 24%);
`;

const ButtonOption = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: ${({ buttonAlign, value }) =>
    buttonAlign === value ? '#2156fa' : '#fff'};
  color: ${({ buttonAlign, value }) =>
    buttonAlign === value ? '#fff' : '#2d2f2f'};
`;

const buttons = [
  {
    type: 'flex-start',
  },
  {
    type: 'center',
  },
  {
    type: 'flex-end',
  },
];

const Button = ({ text = '버튼', ...rest }) => {
  const [isMouseEnter, setMouseEnter] = useState(false);
  const [isClick, setClick] = useState(false);
  const buttonShape = useRecoilValue(buttonShapeState);
  const buttonAlign = rest.options.buttonAlign;
  const [sectionList, setSectionList] = useRecoilState(sectionListState);
  const setHistoryIndex = useSetRecoilState(historyIndexState);
  const setHistoryList = useSetRecoilState(historyListState);

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);
  const handleClick = () => {
    setMouseEnter(false);
    setClick(true);
  };

  const handleButtonAlign = (event) => {
    event.stopPropagation();

    const currentButtonShape = event.currentTarget.value;

    const newSectionList = sectionList.map((section) => {
      if (section.id === rest.id) {
        return {
          ...section,
          options: {
            ...section.options,
            prevButtonAlign: section.options.buttonAlign,
            buttonAlign: currentButtonShape,
          },
        };
      }

      return section;
    });

    updateStore(newSectionList, currentButtonShape);
  };

  const updateStore = (newSectionList, currentButtonShape) => {
    setSectionList(newSectionList);

    setHistoryIndex((historyIndex) => historyIndex + 1);

    setHistoryList((historyList) => [
      ...historyList,
      {
        ...historyList.find((history) => history.id === rest.id),
        ...{
          kind: 'option',
          options: {
            ...rest.options,
            prevButtonAlign: rest.options.buttonAlign,
            buttonAlign: currentButtonShape,
          },
        },
      },
    ]);
  };

  return (
    <ButtonContainer buttonAlign={buttonAlign}>
      <ButtonOptionLayout isMouseEnter={isMouseEnter} isClick={isClick}>
        {buttons.map((button) => (
          <ButtonOption
            key={button.type}
            buttonAlign={buttonAlign}
            value={button.type}
            onClick={handleButtonAlign}
          >
            {button.type === 'flex-start' ? (
              <MdOutlineAlignHorizontalLeft size={30} />
            ) : button.type === 'center' ? (
              <MdOutlineAlignHorizontalCenter size={30} />
            ) : (
              <MdOutlineAlignHorizontalRight size={30} />
            )}
          </ButtonOption>
        ))}
      </ButtonOptionLayout>
      <ButtonLayout
        isMouseEnter={isMouseEnter}
        isClick={isClick}
        buttonShape={buttonShape}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <ButtonLink>
          <ButtonText>{text}</ButtonText>
        </ButtonLink>
      </ButtonLayout>
    </ButtonContainer>
  );
};

export default Button;
