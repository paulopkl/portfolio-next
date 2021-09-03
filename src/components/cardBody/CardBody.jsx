import React from 'react';

import styled from 'styled-components';

import Links from './Links/Links';
import Skills from './Skills/Skills';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;

  @media(max-width: 766px) { width: 90%; }
`;

const CardBody = () => (
  <Body>
    <h1>Skills</h1>
    <Skills />
    <Links />
  </Body>
);

export default CardBody;