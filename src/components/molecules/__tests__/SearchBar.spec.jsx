import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('Componente SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    onSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el input de búsqueda y el botón', () => {
    render(<SearchBar {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/buscar producto por nombre/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  test('muestra el valor de búsqueda actual', () => {
    render(<SearchBar {...defaultProps} value="Torta" />);
    
    expect(screen.getByDisplayValue('Torta')).toBeInTheDocument();
  });

  test('llama a onChange al escribir en el input de búsqueda', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<SearchBar {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText(/buscar producto por nombre/i);
    await user.type(input, 'Pastel');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('llama a onSearch cuando se hace clic en el botón buscar', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    
    render(<SearchBar {...defaultProps} onSearch={handleSearch} />);
    
    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);
    
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test('el input tiene el placeholder correcto', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByPlaceholderText(/buscar producto por nombre/i);
    expect(input).toHaveAttribute('placeholder', 'Buscar producto por nombre...');
  });

  test('el input tiene tipo text', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByPlaceholderText(/buscar producto por nombre/i);
    expect(input).toHaveAttribute('type', 'text');
  });

  test('renderiza con la estructura de layout correcta', () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    
    const wrapper = container.querySelector('.row');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ justifyContent: 'center' });
  });
});
