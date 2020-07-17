import React from 'react';

import { Container } from './styles';

interface ToltipProps {
  title: string;
  className?: string;
}

const Toltip: React.FC<ToltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Toltip;
