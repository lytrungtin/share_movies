import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react'
import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders login form when not logged in', () => {
    render(<Header isLoggedIn={false} setIsShare={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login / Register');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('renders welcome message and share/logout buttons when logged in', () => {
    localStorage.setItem('email', 'test@example.com');
    render(<Header isLoggedIn={true} setIsShare={() => {}} />);
    const welcomeMessage = screen.getByText('Welcome test@example.com');
    const shareButton = screen.getByText('Share a movie');
    const logoutButton = screen.getByText('Logout');
    expect(welcomeMessage).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls setIsShare when share button is clicked', () => {
    const setIsShareMock = jest.fn();
    localStorage.setItem('email', 'test@example.com');
    render(<Header isLoggedIn={true} setIsShare={setIsShareMock} />);
    const shareButton = screen.getByText('Share a movie');
    shareButton.click();
    expect(setIsShareMock).toHaveBeenCalledTimes(1);
    expect(setIsShareMock).toHaveBeenCalledWith(true);
  });

  test('calls setIsShare and sets isLoggedIn to false when logout button is clicked', async () => {
    localStorage.setItem('token', 'test-token');
    const setIsShareMock = jest.fn();
    localStorage.setItem('email', 'test@example.com');
    render(<Header isLoggedIn={true} setIsShare={setIsShareMock} />);
    const logoutButton = screen.getByText('Logout');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    await act(async () => {
      fireEvent.click(logoutButton);
    });
    expect(setIsShareMock).toHaveBeenCalledTimes(1);
    expect(setIsShareMock).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
  });
});
