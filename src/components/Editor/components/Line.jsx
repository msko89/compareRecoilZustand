import React from 'react';
import styled from '@emotion/styled/macro';
import { useRecoilValue } from 'recoil';
import { lineShapeState } from '../../../store/useLine';

const LineLayout = styled.div`
  display: flex;
  width: 300px;
  justify-content: ${({ lineShape }) =>
    lineShape === 'left'
      ? 'flex-start'
      : lineShape === 'right'
      ? 'flex-end'
      : 'center'};
`;

const LineElement = styled.div`
  border: 1px solid #000;
  margin: 30px 0;
  width: 100px;
`;

const Line = () => {
  const lineShape = useRecoilValue(lineShapeState);

  return (
    <LineLayout lineShape={lineShape}>
      <LineElement />
    </LineLayout>
  );
};

export default Line;
