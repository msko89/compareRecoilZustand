import React from 'react';
import { useRecoilValue } from 'recoil';
import { sectionListState } from '../../store/useSection';
import ButtonDesign from './components/ButtonDesign';
import LineDesign from './components/LineDesign';

const GlobalPanel = () => {
  const sectionList = useRecoilValue(sectionListState);
  const buttonList = sectionList.filter((section) => section.type === 'button');
  const lineList = sectionList.filter((section) => section.type === 'line');

  return (
    <section>
      {buttonList.length > 0 && (
        <>
          <h1>Button</h1>
          <ButtonDesign />
        </>
      )}
      {lineList.length > 0 && (
        <>
          <h1>Line</h1>
          <LineDesign />
        </>
      )}
    </section>
  );
};

export default GlobalPanel;
