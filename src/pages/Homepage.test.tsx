import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import Homepage, { STONE_WARNING_TIMEOUT } from './Homepage';

const TIMER_BUFFER = 200;

describe('Homepage', () => {
  test('renders the component with initial content', async () => {
    const screen = await render(<Homepage />);
    
    await expect(screen.getByText('You Are Imprisoned In A Mine')).toBeInTheDocument();
    await expect(screen.getByText(/You have mined/)).toBeInTheDocument();
    await expect(screen.getByText(/Keep mining, or there will be consequences!/)).toBeInTheDocument();
  });

  test('displays initial stone count as 0', async () => {
    const screen = await render(<Homepage />);
    
    await expect(screen.getByText(/0 stone/)).toBeInTheDocument();
  });

  test('renders the Mine Stone button', async () => {
    const screen = await render(<Homepage />);
    
    const button = screen.getByRole('button', { name: /Mine Stone/i });
    await expect(button).toBeInTheDocument();
  });

  test('increments stone count when Mine Stone button is clicked', async () => {
    const screen = await render(<Homepage />);
    
    const button = screen.getByRole('button', { name: /Mine Stone/i });
    
    await expect(screen.getByText(/0 stone/)).toBeInTheDocument();
    
    await button.click();
    await expect(screen.getByText(/1 stone/)).toBeInTheDocument();
    
    await button.click();
    await expect(screen.getByText(/2 stones/)).toBeInTheDocument();
  });

  test('displays correct plural form for multiple stones', async () => {
    const screen = await render(<Homepage />);
    
    const button = screen.getByRole('button', { name: /Mine Stone/i });
    
    await button.click();
    await expect(screen.getByText(/1 stone/)).toBeInTheDocument();
    
    await button.click();
    await expect(screen.getByText(/2 stones/)).toBeInTheDocument();
  });

  test('shows guard warning toast after several seconds with no click', async () => {
    vi.useFakeTimers();
    try {
      const screen = await render(<Homepage />);

      // advance past the warning interval
      vi.advanceTimersByTime(STONE_WARNING_TIMEOUT + TIMER_BUFFER);
      // allow pending effects to run
      await Promise.resolve();

      await expect(screen.getByText(/The guard glares menacingly at you/)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  test('hides guard warning toast when Mine Stone is clicked', async () => {
    vi.useFakeTimers();
    try {
      const screen = await render(<Homepage />);
      const button = screen.getByRole('button', { name: /Mine Stone/i });

      vi.advanceTimersByTime(STONE_WARNING_TIMEOUT + TIMER_BUFFER);
      await Promise.resolve();
      await expect(screen.getByText(/The guard glares menacingly at you/)).toBeInTheDocument();

      await button.click();
      // allow state updates to flush
      await Promise.resolve();

      // the Toast uses the 'show' class when visible; ensure none are shown
      const shownToast = document.querySelector('.toast.show');
      expect(shownToast).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

});
  