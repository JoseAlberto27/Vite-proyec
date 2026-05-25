export const authService = {
  async login(credentials) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 650);
    });

    if (!credentials.email || !credentials.password) {
      throw new Error('Ingresa email y contrasena.');
    }

    return {
      token: 'demo-access-token',
      user: {
        id: 1,
        name: 'Usuario Demo',
        email: credentials.email
      }
    };
  }
};
