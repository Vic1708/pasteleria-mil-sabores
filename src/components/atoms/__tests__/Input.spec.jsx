import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Componente Input', () => {
  test('renderiza el elemento input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('aplica correctamente el atributo type', () => {
    const { rerender } = render(<Input type="email" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    input = screen.getByDisplayValue('') || document.querySelector('input[type="password"]');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('muestra el texto del placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  test('muestra el valor de la prop value', () => {
    render(<Input value="Test Value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  test('llama al manejador onChange cuando cambia el input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('establece correctamente el atributo name', () => {
    render(<Input name="username" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'username');
  });

  test('establece el atributo required cuando se especifica', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  test('aplica la clase input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input');
  });
});
