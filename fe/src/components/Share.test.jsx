import React from 'react';
import { render, screen } from '@testing-library/react';
import Share from './Share';

describe('Share component', () => {
  const items = [
    { id: 1, description: 'Item 1', user: {email: 'test@example.com'} },
    { id: 2, description: 'Item 2', user: {email: 'test@example.com'} },
  ];

  it('should render ShareForm if user is logged in and is_share is true', () => {
    const setItems = jest.fn();
    const isLoggedIn = () => true;
    const is_share = true;

    render(<Share isLoggedIn={isLoggedIn} is_share={is_share} items={items} setItems={setItems} />);

    expect(screen.getByText('Share a Youtube movie')).toBeInTheDocument();
  });

  it('should render ShareListing if user is not logged in or is_share is false', () => {
    const setItems = jest.fn();
    const isLoggedIn = () => false;
    const is_share = false;

    render(<Share isLoggedIn={isLoggedIn} is_share={is_share} items={items} setItems={setItems} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
