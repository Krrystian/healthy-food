import { render, screen, fireEvent } from '@testing-library/react';
import { SignOutButton } from '../components/SignInOut/SignOutButton';
import { signOut } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('SignOutButton', () => {
  test('renders button with correct text', () => {
    render(<SignOutButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Wyloguj');
  });

  test('calls signOut function when clicked', () => {
    render(<SignOutButton />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(signOut).toHaveBeenCalled();
  });
});
