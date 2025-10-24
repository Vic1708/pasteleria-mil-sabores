import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Componente Button', () => {
  test('renderiza el botón con texto hijo', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('aplica la clase variant primary por defecto', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  test('aplica clase variant personalizada', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-secondary');
  });

  test('llama al manejador onClick cuando se hace clic', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('establece correctamente el atributo type del botón', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('usa tipo button por defecto cuando no se especifica', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
