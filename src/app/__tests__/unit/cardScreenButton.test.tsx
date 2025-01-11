import CardScreen from '../../components/Diet/Carousel'; 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Link button test', () => {
  it('should render the button', () => {
    render(<CardScreen />);
    const linkElement = screen.getByRole('link', { name: /Wypełnij quiz, aby poznać dietę/i });
    expect(linkElement).toBeInTheDocument();
  });

  it('should display the correct text', () => {
    render(<CardScreen />);
    const linkElement = screen.getByRole('link', { name: /Wypełnij quiz, aby poznać dietę/i });
    expect(linkElement).toHaveTextContent('Wypełnij quiz, aby poznać dietę');
  });

  it('should navigate to the correct URL', () => {
    render(<CardScreen />);
    const linkElement = screen.getByRole('link', { name: /Wypełnij quiz, aby poznać dietę/i });
    expect(linkElement).toHaveAttribute('href', '/diet/form');
  });
});
