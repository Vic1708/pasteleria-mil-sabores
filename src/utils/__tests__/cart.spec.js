import { addToCart, getCart, clearCart } from '../cart';

describe('Utilidades del Carrito', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('addToCart', () => {
    test('agrega un producto nuevo a un carrito vacío', () => {
      const product = {
        id: 1,
        name: 'Torta de Chocolate',
        price: 15000,
      };

      addToCart(product);

      const savedCart = JSON.parse(localStorage.getItem('cart'));
      expect(savedCart).toEqual([{ ...product, quantity: 1 }]);
      expect(global.alert).toHaveBeenCalledWith('Torta de Chocolate agregado al carrito 🛒');
      expect(global.dispatchEvent).toHaveBeenCalled();
    });

    test('incrementa la cantidad cuando el producto ya existe en el carrito', () => {
      const existingCart = [
        { id: 1, name: 'Torta de Chocolate', price: 15000, quantity: 1 },
      ];
      localStorage.setItem('cart', JSON.stringify(existingCart));

      const product = {
        id: 1,
        name: 'Torta de Chocolate',
        price: 15000,
      };

      addToCart(product);

      const savedCart = JSON.parse(localStorage.getItem('cart'));
      expect(savedCart).toEqual([{ ...product, quantity: 2 }]);
    });

    test('agrega un producto nuevo a un carrito existente con productos diferentes', () => {
      const existingCart = [
        { id: 1, name: 'Torta de Chocolate', price: 15000, quantity: 1 },
      ];
      localStorage.setItem('cart', JSON.stringify(existingCart));

      const newProduct = {
        id: 2,
        name: 'Pastel de Fresa',
        price: 12000,
      };

      addToCart(newProduct);

      const expectedCart = [
        { id: 1, name: 'Torta de Chocolate', price: 15000, quantity: 1 },
        { ...newProduct, quantity: 1 },
      ];

      const savedCart = JSON.parse(localStorage.getItem('cart'));
      expect(savedCart).toEqual(expectedCart);
    });

    test('dispara el evento cartUpdated', () => {
      const product = { id: 1, name: 'Test Product', price: 1000 };
      addToCart(product);

      expect(global.dispatchEvent).toHaveBeenCalledTimes(1);
      const event = global.dispatchEvent.mock.calls[0][0];
      expect(event.type).toBe('cartUpdated');
    });

    test('maneja errores correctamente', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Romper temporalmente JSON.parse
      const originalParse = JSON.parse;
      JSON.parse = () => {
        throw new Error('Parse error');
      };

      const product = { id: 1, name: 'Test Product', price: 1000 };
      addToCart(product);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al agregar al carrito:',
        expect.any(Error)
      );

      // Restaurar JSON.parse
      JSON.parse = originalParse;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getCart', () => {
    test('retorna un array vacío cuando el carrito está vacío', () => {
      const cart = getCart();
      expect(cart).toEqual([]);
    });

    test('retorna los items del carrito desde localStorage', () => {
      const cartData = [
        { id: 1, name: 'Torta de Chocolate', price: 15000, quantity: 2 },
        { id: 2, name: 'Pastel de Fresa', price: 12000, quantity: 1 },
      ];
      localStorage.setItem('cart', JSON.stringify(cartData));

      const cart = getCart();

      expect(cart).toEqual(cartData);
    });

    test('maneja JSON inválido correctamente', () => {
      localStorage.setItem('cart', 'invalid json');
      expect(() => getCart()).toThrow();
    });
  });

  describe('clearCart', () => {
    test('elimina el carrito del localStorage', () => {
      localStorage.setItem('cart', JSON.stringify([{ id: 1, name: 'Test', price: 100 }]));
      
      clearCart();

      expect(localStorage.getItem('cart')).toBeNull();
    });

    test('dispara el evento cartUpdated', () => {
      clearCart();

      expect(global.dispatchEvent).toHaveBeenCalledTimes(1);
      const event = global.dispatchEvent.mock.calls[0][0];
      expect(event.type).toBe('cartUpdated');
    });
  });
});
