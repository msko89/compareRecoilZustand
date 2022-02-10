import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { buttonShapeState } from '../../../store/useButton';
import { useRecoilValue } from 'recoil';

const ButtonLayout = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  margin: 50px auto;
  border-radius: ${({ buttonShape }) =>
    buttonShape === 'circle' ? '50%' : buttonShape === 'rounded' ? '20%' : 0};

  &:before {
    display: ${({ isMouseOver }) => !isMouseOver && 'none'};
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

const Button = ({ text = '버튼' }) => {
  const [isMouseEnter, setMouseEnter] = useState(false);
  const buttonShape = useRecoilValue(buttonShapeState);

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  return (
    <ButtonLayout
      isMouseOver={isMouseEnter}
      buttonShape={buttonShape}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ButtonLink>
        <ButtonText>{text}</ButtonText>
      </ButtonLink>
    </ButtonLayout>
  );
};

export default Button;
