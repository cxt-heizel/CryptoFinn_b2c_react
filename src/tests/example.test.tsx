import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { AppProviders } from '../app/providers/AppProviders';

describe('App', () => {
  it('renders root layout', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
