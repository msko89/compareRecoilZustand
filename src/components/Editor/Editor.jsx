import React from 'react';
import Header from './Header';
import '../css/editor.scss';
import PagePreview from './PagePreview';
import styled from '@emotion/styled/macro';
import Panel from './Panel';

const Main = styled.main`
  display: flex;
  justify-content: space-between;
`;

const Editor = () => {
  return (
    <>
      <Header />
      <Main>
        <Panel />
        <PagePreview />
      </Main>
    </>
  );
};

export default Editor;
