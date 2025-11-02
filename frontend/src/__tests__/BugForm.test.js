import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../components/BugForm';

describe('BugForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all fields', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit bug/i })).toBeInTheDocument();
  });

  test('displays validation error when title is empty', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('displays validation error when description is empty', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Bug' } });

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: 'Test Bug' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test Description',
      status: 'open',
      priority: 'medium'
    });
  });

  test('displays edit mode when editingBug is provided', () => {
    const editingBug = {
      id: 1,
      title: 'Existing Bug',
      description: 'Existing Description',
      status: 'in-progress',
      priority: 'high'
    };

    render(<BugForm onSubmit={mockOnSubmit} editingBug={editingBug} onCancel={mockOnCancel} />);

    expect(screen.getByRole('heading', { name: /edit bug/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Bug');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Existing Description');
    expect(screen.getByRole('button', { name: /update bug/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const editingBug = {
      id: 1,
      title: 'Existing Bug',
      description: 'Existing Description',
      status: 'open',
      priority: 'medium'
    };

    render(<BugForm onSubmit={mockOnSubmit} editingBug={editingBug} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('clears error message when user starts typing', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'T' } });

    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
  });

  test('validates title length does not exceed 100 characters', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: 'a'.repeat(101) } });
    fireEvent.change(descriptionInput, { target: { value: 'Valid description' } });

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title must be less than 100 characters/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates description length does not exceed 500 characters', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: 'Valid title' } });
    fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(501) } });

    const submitButton = screen.getByRole('button', { name: /submit bug/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/description must be less than 500 characters/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
