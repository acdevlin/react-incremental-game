import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.tsx';

describe('App', () => {
  test('loads successfully', async () => {
    const screen = await render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await expect(screen).toBeDefined();
    await expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });
});
