import { expect, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Calculator Exercise/i)).toBeDefined();
});
