import React from 'react';
import { useRecoilValue } from 'recoil';
import { sectionListState } from '../../store/useSection';
import Design from './Design';
import Button from './components/Button';
import Line from './components/Line';

const PagePreview = () => {
  const sectionList = useRecoilValue(sectionListState);

  return (
    <>
      <section>
        {sectionList.map((section) =>
          section.type === 'button' ? (
            <Button key={section.id} {...section} />
          ) : (
            <Line key={section.id} />
          )
        )}
      </section>
      {sectionList.length > 0 && <Design />}
    </>
  );
};

export default PagePreview;
