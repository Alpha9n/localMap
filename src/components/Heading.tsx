import { ReactNode, ElementType } from 'react';

type Props = {
  level: number;
  text: string;
};

const Heading = ({ level, text }: Props) => {
  let HeadingTag = `h${level}` as ElementType;
  return (
    <HeadingTag
        className='my-2 font-bold'
    >
        {text}
    </HeadingTag>
  );
};

export default Heading;