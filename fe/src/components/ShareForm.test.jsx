import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareForm from './ShareForm';

describe('ShareForm component', () => {
  it('renders the form correctly', () => {
    const setItems = jest.fn();
    const fetchItems = jest.fn();
    render(<ShareForm setItems={setItems} fetchItems={fetchItems} />);
    expect(screen.getByText('Youtube URL')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('sends a POST request to create a share when the form is submitted', async () => {
    const setItems = jest.fn();
    const fetchItems = jest.fn();
    const share = { id: 1, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: share }),
    });
    render(<ShareForm setItems={setItems} fetchItems={fetchItems} />);
    const input = screen.getByPlaceholderText('url');
    fireEvent.change(input, { target: { value: share.url } });
    const button = screen.getByText('Share');
    fireEvent.click(button);
    expect(await screen.findByText('Your video has been shared successfully!')).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/shares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer null' },
      body: JSON.stringify({ share: { url: share.url } }),
    });
  });
});
