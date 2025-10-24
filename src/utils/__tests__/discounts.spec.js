import { calcularDescuentoCarrito } from '../discounts';

describe('Utilidades de Descuentos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Mockear la fecha actual a una fecha fija para pruebas consistentes
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-10-23'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockCart = [
    { id: 1, name: 'Torta de Chocolate', category: 'Tortas', price: 15000, quantity: 1 },
    { id: 2, name: 'Pastel de Fresa', category: 'Pasteles', price: 12000, quantity: 2 },
  ];

  describe('Sin descuentos aplicados', () => {
    test('retorna precio completo cuando no hay usuario o descuentos', () => {
      const result = calcularDescuentoCarrito(mockCart, {});
      
      expect(result.subtotal).toBe(39000); // 15000 + 12000*2
      expect(result.totalConDescuento).toBe(39000);
      expect(result.beneficio).toBe('Sin beneficios activos.');
    });

    test('maneja carrito vacío', () => {
      const result = calcularDescuentoCarrito([]);
      
      expect(result.subtotal).toBe(0);
      expect(result.totalConDescuento).toBe(0);
      // Carrito vacío retorna beneficio vacío
      expect(result.beneficio).toBe('');
    });
  });

  describe('Descuento cumpleaños + email DUOC', () => {
    test('aplica torta gratis en cumpleaños con email DUOC', () => {
      const usuario = {
        correo: 'juan.perez@duocuc.cl',
        fechaNacimiento: '2000-10-23', // Fecha de hoy (mes y día)
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.subtotal).toBe(39000);
      // Debe restar la torta más barata (12000)
      expect(result.totalConDescuento).toBe(27000); // 39000 - 12000
      expect(result.beneficio).toContain('torta gratis por tu cumpleaños');
    });

    test('no aplica descuento de cumpleaños sin email DUOC', () => {
      const usuario = {
        correo: 'juan.perez@gmail.com',
        fechaNacimiento: '2000-10-23',
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.totalConDescuento).toBe(39000);
      expect(result.beneficio).toBe('Sin beneficios activos.');
    });

    test('no aplica descuento de cumpleaños en día diferente', () => {
      const usuario = {
        correo: 'juan.perez@duocuc.cl',
        fechaNacimiento: '2000-05-15', // Fecha diferente
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.totalConDescuento).toBe(39000);
    });
  });

  describe('Descuento basado en edad (50+)', () => {
    test('aplica 50% de descuento para usuarios de 50 años o más', () => {
      const usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1970-01-01', // Mayor de 50
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.subtotal).toBe(39000);
      expect(result.totalConDescuento).toBe(19500); // 50% de descuento
      expect(result.beneficio).toContain('50% por ser mayor de 50 años');
    });

    test('no aplica descuento de edad para usuarios menores de 50', () => {
      const usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1980-01-01', // Menor de 50
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.totalConDescuento).toBe(39000);
      expect(result.beneficio).toBe('Sin beneficios activos.');
    });

    test('descuento de cumpleaños tiene prioridad sobre descuento de edad', () => {
      const usuario = {
        correo: 'usuario@duocuc.cl',
        fechaNacimiento: '1970-10-23', // 50+ y cumpleaños
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      // Debe aplicar descuento de cumpleaños (torta gratis) en lugar de 50%
      expect(result.totalConDescuento).toBe(27000);
      expect(result.beneficio).toContain('torta gratis');
    });
  });

  describe('Descuento por código promocional', () => {
    test('aplica 10% de descuento con código FELICES50', () => {
      const usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1990-01-01',
        codigoDescuento: 'FELICES50',
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.subtotal).toBe(39000);
      expect(result.totalConDescuento).toBe(35100); // 90% de 39000
      expect(result.beneficio).toContain('10% de descuento de por vida');
    });

    test('no aplica descuento con código inválido', () => {
      const usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1990-01-01',
        codigoDescuento: 'INVALID',
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      expect(result.totalConDescuento).toBe(39000);
      expect(result.beneficio).toBe('Sin beneficios activos.');
    });

    test('descuento de edad tiene prioridad sobre código promocional', () => {
      const usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1970-01-01', // 50+ años
        codigoDescuento: 'FELICES50',
      };

      const result = calcularDescuentoCarrito(mockCart, usuario);

      // Debe aplicar descuento del 50% en lugar del 10%
      expect(result.totalConDescuento).toBe(19500);
      expect(result.beneficio).toContain('50%');
    });
  });

  describe('Prioridad de descuentos', () => {
    test('orden de prioridad: cumpleaños+DUOC > edad 50+ > código promo', () => {
      // Prioridad 1: Cumpleaños + DUOC
      let usuario = {
        correo: 'usuario@duocuc.cl',
        fechaNacimiento: '2000-10-23',
        codigoDescuento: 'FELICES50',
      };
      let result = calcularDescuentoCarrito(mockCart, usuario);
      expect(result.beneficio).toContain('torta gratis');

      // Prioridad 2: Edad 50+
      usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1970-01-01',
        codigoDescuento: 'FELICES50',
      };
      result = calcularDescuentoCarrito(mockCart, usuario);
      expect(result.beneficio).toContain('50%');

      // Prioridad 3: Código promocional
      usuario = {
        correo: 'usuario@email.com',
        fechaNacimiento: '1990-01-01',
        codigoDescuento: 'FELICES50',
      };
      result = calcularDescuentoCarrito(mockCart, usuario);
      expect(result.beneficio).toContain('10%');
    });
  });

  describe('Casos especiales', () => {
    test('maneja carrito con items de precio cero', () => {
      const cart = [{ id: 1, name: 'Free Item', price: 0, quantity: 1 }];
      const result = calcularDescuentoCarrito(cart);

      expect(result.subtotal).toBe(0);
      expect(result.totalConDescuento).toBe(0);
    });

    test('lee usuario desde localStorage si no se proporciona', () => {
      const mockUser = {
        correo: 'test@duocuc.cl',
        fechaNacimiento: '2000-10-23',
      };
      localStorage.setItem('usuario', JSON.stringify(mockUser));

      const result = calcularDescuentoCarrito(mockCart);

      expect(result.beneficio).toContain('torta gratis');
    });

    test('maneja datos de usuario faltantes correctamente', () => {
      const result = calcularDescuentoCarrito(mockCart);

      expect(result.subtotal).toBe(39000);
      expect(result.totalConDescuento).toBe(39000);
      expect(result.beneficio).toBe('Sin beneficios activos.');
    });

    test('maneja items del carrito sin campo quantity', () => {
      const cart = [
        { id: 1, name: 'Torta', category: 'Tortas', price: 10000 }, // sin quantity
      ];

      const result = calcularDescuentoCarrito(cart);

      expect(result.subtotal).toBe(10000); // Por defecto quantity es 1
    });

    test('redondea el total correctamente', () => {
      const cart = [{ id: 1, name: 'Item', price: 1000, quantity: 1 }];
      const usuario = {
        correo: 'test@email.com',
        fechaNacimiento: '1970-01-01',
      };

      const result = calcularDescuentoCarrito(cart, usuario);

      expect(result.totalConDescuento).toBe(500); // 50% de 1000 correctamente redondeado
    });
  });
});
