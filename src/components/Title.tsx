import React from 'react';
import { TitleProps } from '../types/types';

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className="text-xl my-10">{text}</h1>;
};

export default Title;
