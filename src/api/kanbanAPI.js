const API_BASE_URL = 'https://wedev-api.sky.pro/api';

const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  if (!response.ok) {
    if (data.message) {
      throw new Error(data.message);
    }
    if (data.error) {
      throw new Error(data.error);
    }
    if (response.status === 401) {
      throw new Error('Не авторизован. Пожалуйста, войдите заново.');
    }
    if (response.status === 404) {
      throw new Error('Задача не найдена');
    }
    if (response.status === 400) {
      // Если есть сообщение о дате
      if (data.message && data.message.includes('date')) {
        throw new Error('Неверный формат даты. Используйте формат YYYY-MM-DD');
      }
      throw new Error(data.message || 'Неверный формат данных');
    }
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  return data;
};

// 🔥 ФУНКЦИЯ ДЛЯ ФОРМАТИРОВАНИЯ ДАТЫ В ISO
const formatDateForAPI = (dateInput) => {
  // Если дата не передана - текущая дата
  if (!dateInput) {
    return new Date().toISOString();
  }

  // Если уже ISO строка
  if (dateInput.includes('T') && dateInput.includes('Z')) {
    return dateInput;
  }

  // Если дата в формате "DD.MM.YY" или "DD.MM.YYYY"
  const parts = dateInput.split('.');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    let year = parts[2];
    
    // Если год в формате YY (2 цифры)
    if (year.length === 2) {
      year = `20${year}`;
    }
    
    // Создаём дату в ISO формате
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return date.toISOString();
  }

  // Если дата в формате "YYYY-MM-DD"
  if (dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const date = new Date(`${dateInput}T00:00:00.000Z`);
    return date.toISOString();
  }

  // Если ничего не подошло - текущая дата
  
  return new Date().toISOString();
};

// 🔥 ФУНКЦИЯ ДЛЯ ФОРМАТИРОВАНИЯ ДАТЫ ИЗ API
const formatDateFromAPI = (dateString) => {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
  } catch {
    return '—';
  }
};

// Маппинг категорий
const mapCategoryToTopic = (category) => {
  const map = {
    'orange': 'Web Design',
    'green': 'Research',
    'purple': 'Copywriting',
  };
  return map[category] || 'Research';
};

const mapTopicToCategory = (topic) => {
  const map = {
    'Web Design': 'orange',
    'Research': 'green',
    'Copywriting': 'purple',
  };
  return map[topic] || 'orange';
};

export const kanbanAPI = {
  // 📋 ПОЛУЧИТЬ ВСЕ ЗАДАЧИ
  getAll: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден. Пожалуйста, войдите заново.');
      }
      
      
      
      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const result = await handleResponse(response);
      const tasks = result.tasks || [];
      
      
      return tasks.map(task => ({
        id: task._id,
        title: task.title || 'Новая задача',
        desc: task.description || ' ',
        category: mapTopicToCategory(task.topic),
        status: task.status || 'Без статуса',
        date: formatDateFromAPI(task.date),
        userId: task.userId,
        createdAt: task.date,
        _id: task._id,
      }));
    } catch (error) {
      
      throw error;
    }
  },

  // ➕ СОЗДАТЬ ЗАДАЧУ
  create: async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден. Пожалуйста, войдите заново.');
      }


      
      
      // 🔥 ФОРМАТИРУЕМ ДАТУ ПРАВИЛЬНО
      let formattedDate;
      if (taskData.date) {
        formattedDate = formatDateForAPI(taskData.date);
      } else {
        formattedDate = new Date().toISOString();
      }
      
      
      
      const requestData = {
        title: taskData.title || 'Новая задача',
        topic: mapCategoryToTopic(taskData.category || 'orange'),
        status: taskData.status || 'Без статуса',
        description: taskData.desc || ' ',
        date: formattedDate,
      };
      
      
      
      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,          
        },
        body: JSON.stringify(requestData),
      });
      
      const result = await handleResponse(response);
      
      const tasks = result.tasks || [];
      const newTask = tasks[tasks.length - 1];
      
     
      
      return {
        id: newTask._id,
        title: newTask.title,
        desc: newTask.description || '',
        category: mapTopicToCategory(newTask.topic),
        status: newTask.status || 'Без статуса',
        date: formatDateFromAPI(newTask.date),
        userId: newTask.userId,
        createdAt: newTask.date,
        _id: newTask._id,
      };
    } catch (error) {
      
      throw error;
    }
  },

  // ✏️ ОБНОВИТЬ ЗАДАЧУ
  update: async (id, taskData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден. Пожалуйста, войдите заново.');
      }
      
      
      
      // 🔥 ФОРМАТИРУЕМ ДАТУ ПРАВИЛЬНО
      let formattedDate;
      if (taskData.date) {
        formattedDate = formatDateForAPI(taskData.date);
      } else {
        formattedDate = new Date().toISOString();
      }
      
      const requestData = {
        title: taskData.title,
        topic: mapCategoryToTopic(taskData.category),
        status: taskData.status,
        description: taskData.desc || ' ',
        date: formattedDate,
      };
      
      
      
      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
        body: JSON.stringify(requestData),
      });
      
      const result = await handleResponse(response);
      
      const tasks = result.tasks || [];
      const updatedTask = tasks.find(t => t._id === id);
      
      if (!updatedTask) {
        throw new Error('Обновлённая задача не найдена');
      }
      
      
      
      return {
        id: updatedTask._id,
        title: updatedTask.title,
        desc: updatedTask.description || '',
        category: mapTopicToCategory(updatedTask.topic),
        status: updatedTask.status || 'Без статуса',
        date: formatDateFromAPI(updatedTask.date),
        userId: updatedTask.userId,
        createdAt: updatedTask.date,
        _id: updatedTask._id,
      };
    } catch (error) {
      
      throw error;
    }
  },

  // 🗑 УДАЛИТЬ ЗАДАЧУ
  delete: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден. Пожалуйста, войдите заново.');
      }
      
      
      
      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      await handleResponse(response);
      
      
      return { success: true };
    } catch (error) {
      
      throw error;
    }
  },
};