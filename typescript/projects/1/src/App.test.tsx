import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App confirmOpen={false} confrimCancel={false} handleOkClick={function (): void {
    throw new Error('Function not implemented.');
  } } handleOkCancel={function (): void {
    throw new Error('Function not implemented.');
  } } />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});