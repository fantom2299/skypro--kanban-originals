const API_BASE_URL = 'https://wedev-api.sky.pro/api';

// Обработка ответа от сервера
const handleResponse = async (response) => {
  // Пробуем получить тело ответа
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  // Если статус не успешный
  if (!response.ok) {
    // Обработка ошибок от сервера
    if (data.message) {
      throw new Error(data.message);
    }
    if (data.error) {
      throw new Error(data.error);
    }
    if (response.status === 400) {
      throw new Error('Неверные данные. Проверьте введённую информацию.');
    }
    if (response.status === 401) {
      throw new Error('Неверный логин или пароль');
    }
    if (response.status === 409) {
      throw new Error('Пользователь с таким логином уже существует');
    }
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  return data;
};

export const authAPI = {
  // 🔐 РЕГИСТРАЦИЯ
  register: async (userData) => {
    try {
      console.log('📝 Регистрация пользователя:', userData);
      
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        
        body: JSON.stringify({
          login: userData.email,      // email используется как login
          name: userData.name,
          password: userData.password,
        }),
      });
      
      const result = await handleResponse(response);
      console.log('✅ Регистрация успешна:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error);
      throw error;
    }
  },

  // 🔐 АВТОРИЗАЦИЯ (ВХОД)
  login: async (credentials) => {
    try {
      console.log('🔑 Авторизация пользователя:', credentials.login);
      
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        
        body: JSON.stringify({
          login: credentials.login,
          password: credentials.password,
        }),
      });
      
      const result = await handleResponse(response);
      console.log('✅ Авторизация успешна:', result);
      
      // Сохраняем токен
      if (result.user?.token) {
        localStorage.setItem('token', result.user.token);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Ошибка авторизации:', error);
      throw error;
    }
  },

  // 👤 ПОЛУЧИТЬ ИНФОРМАЦИЮ О ТЕКУЩЕМ ПОЛЬЗОВАТЕЛЕ
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }
      
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await handleResponse(response);
      return result;
    } catch (error) {
      console.error('❌ Ошибка получения пользователя:', error);
      throw error;
    }
  },
};