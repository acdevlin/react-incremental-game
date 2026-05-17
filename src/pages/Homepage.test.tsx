import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Homepage from './Homepage';

describe('Homepage', () => {
  test('renders the component with initial content', async () => {
    const screen = await render(<Homepage />);
    
    await expect(screen.getByText('Get started')).toBeInTheDocument();
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

  test('renders hero images', async () => {
    const screen = await render(<Homepage />);
    
    const heroImg = screen.getByAltText('Hero character');
    const reactLogo = screen.getByAltText('React logo');
    const viteLogo = screen.getByAltText('Vite logo');
    
    await expect(heroImg).toBeInTheDocument();
    await expect(reactLogo).toBeInTheDocument();
    await expect(viteLogo).toBeInTheDocument();
  });
});
