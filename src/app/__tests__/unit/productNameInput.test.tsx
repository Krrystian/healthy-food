import { render, screen, fireEvent } from '@testing-library/react';
import BarcodeScanner from '../../components/ProductsScanner/BarcodeScanner';
import '@testing-library/jest-dom';  // Dodaj ten import

describe('BarcodeScanner', () => {
  test('renderuje input do wyszukiwania', () => {
    render(<BarcodeScanner />);
    
    const inputElement = screen.getByPlaceholderText('Wprowadź dane');
    expect(inputElement).toBeInTheDocument();
  });

  test('zmienia wartość w polu input po wpisaniu tekstu', () => {
    render(<BarcodeScanner />);
    
    const inputElement = screen.getByPlaceholderText('Wprowadź dane') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Test' } });

    expect(inputElement.value).toBe('Test');
  });  

  test('input powinien mieć początkową wartość pustą', () => {
    render(<BarcodeScanner />);
    
    const inputElement = screen.getByPlaceholderText('Wprowadź dane') as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });
});
