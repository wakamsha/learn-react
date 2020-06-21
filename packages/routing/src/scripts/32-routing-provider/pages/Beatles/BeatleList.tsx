import { BEATLES } from '.';
import { Link } from 'react-router-dom';
import React from 'react';

export const BeatleList = () => (
  <ul>
    {BEATLES.map(({ id, nameEn }) => (
      <li key={id}>
        <Link to={`/beatles/${id}`}>{nameEn}</Link>
      </li>
    ))}
  </ul>
);
