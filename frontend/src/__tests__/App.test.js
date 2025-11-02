import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock fetch
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock
    global.fetch.mockClear();
  });

  test('renders app header', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<App />);

    expect(screen.getByText(/bug tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/track and manage your application bugs/i)).toBeInTheDocument();
  });

  test('fetches and displays bugs on mount', async () => {
    const mockBugs = [
      {
        id: 1,
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBugs
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Bug')).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

    render(<App />);

    expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();
  });

  test('displays error message when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  test('displays empty state when no bugs exist', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
    });
  });

  test('renders BugForm component', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });
  });
});
