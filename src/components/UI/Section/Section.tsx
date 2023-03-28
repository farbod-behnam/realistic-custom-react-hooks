import { ReactNode } from 'react';
import classes from './Section.module.css';

interface Props {
  children: ReactNode;
}

export default function Section(props: Props) {
  return <section className={classes.section}>{props.children}</section>;
};

