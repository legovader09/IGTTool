import * as React from 'react';
import { LoaderProps } from '../../interfaces/LoaderProps';

export const Loader = ({ text = 'Gathering results...' }: LoaderProps) => (
  <section className="container">
    <section className="row">
      <div className="col-12 loader-wrapper">
        <section className="loader" />
        <p>{text}</p>
      </div>
    </section>
  </section>
);
