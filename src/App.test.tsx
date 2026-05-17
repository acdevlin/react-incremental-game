import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App.tsx';

describe('App', () => {
  test('loads successfully', async () => {
    const screen = await render(<App />);
    await expect(screen).toBeDefined();
    await expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });
});
