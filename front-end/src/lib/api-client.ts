import Axios, { InternalAxiosRequestConfig } from 'axios';
import { useNotifications } from '@/components/ui/notifications';

// Interceptor de solicitud
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }
  return config;
}
// Interceptor de respuesta
function responseInterceptor(response: any) {
  return response.data;
}

function errorInterceptor(error: any) {
  const message = error.response?.data?.message || error.message;
  useNotifications.getState().addNotification({
    type: 'error',
    title: 'Error',
    message,
  });

  return Promise.reject(error);
}
// Instancia para el servicio de autenticación
export const authApi = Axios.create({
  baseURL: '/apiauth',
});

authApi.interceptors.request.use(authRequestInterceptor);
authApi.interceptors.response.use(responseInterceptor, errorInterceptor);

// Instancia para el servicio de inventario
export const inventoryApi = Axios.create({
  baseURL: '/apiinventory',
});

inventoryApi.interceptors.request.use(authRequestInterceptor);
inventoryApi.interceptors.response.use(responseInterceptor, errorInterceptor);
