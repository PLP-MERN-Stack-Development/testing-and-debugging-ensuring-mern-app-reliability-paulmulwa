import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugList from '../components/BugList';

describe('BugList Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnUpdateStatus = jest.fn();

  const mockBugs = [
    {
      id: 1,
      title: 'Bug 1',
      description: 'First bug description',
      status: 'open',
      priority: 'high',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      title: 'Bug 2',
      description: 'Second bug description',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2025-01-02T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no bugs exist', () => {
    render(
      <BugList 
        bugs={[]} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
  });

  test('renders list of bugs', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
    expect(screen.getByText('First bug description')).toBeInTheDocument();
    expect(screen.getByText('Second bug description')).toBeInTheDocument();
  });

  test('displays bug count in heading', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText(/bug list \(2\)/i)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const editButtons = screen.getAllByText(/edit/i);
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockBugs[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('calls onUpdateStatus when status is changed', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const statusSelects = screen.getAllByRole('combobox');
    fireEvent.change(statusSelects[0], { target: { value: 'resolved' } });

    expect(mockOnUpdateStatus).toHaveBeenCalledWith(1, 'resolved');
  });

  test('displays status badges correctly', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const statusBadges = screen.getAllByText(/open|in-progress/i);
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  test('displays priority badges correctly', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  test('displays creation date', () => {
    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const createdTexts = screen.getAllByText(/created:/i);
    expect(createdTexts.length).toBe(2);
  });
});
