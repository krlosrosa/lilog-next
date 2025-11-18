import { AxiosError } from 'axios';

type AxiosErrorResponse = {
  message?: string;
  error?: string;
  errors?: string[] | { [key: string]: string[] };
  data?: {
    message?: string;
    error?: string;
  };
};

export const getAxiosErrorMessage = (error: any): string => {
  // Se não for um erro, retorna mensagem padrão
  if (!error) {
    return 'Ocorreu um erro desconhecido. Tente novamente.';
  }

  // Se for um AxiosError, tenta extrair a mensagem do response
  if (error instanceof AxiosError || error?.isAxiosError) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    const response = axiosError.response;

    // Tenta pegar a mensagem do response.data
    if (response?.data) {
      // Caso 1: response.data.message
      if (response.data.message) {
        return response.data.message;
      }

      // Caso 2: response.data.error
      if (response.data.error) {
        return response.data.error;
      }

      // Caso 3: response.data.data?.message (estrutura aninhada)
      if (response.data.data?.message) {
        return response.data.data.message;
      }

      // Caso 4: response.data.errors (array de erros)
      if (response.data.errors) {
        if (Array.isArray(response.data.errors)) {
          return response.data.errors.join(', ');
        }
        if (typeof response.data.errors === 'object') {
          const errorMessages = Object.values(response.data.errors)
            .flat()
            .filter(Boolean);
          if (errorMessages.length > 0) {
            return errorMessages.join(', ');
          }
        }
      }
    }

    // Tenta pegar o statusText
    if (response?.statusText) {
      return response.statusText;
    }

    // Tenta pegar a mensagem padrão do erro
    if (axiosError.message) {
      return axiosError.message;
    }
  }

  // Se o erro tiver uma propriedade message diretamente
  if (error.message) {
    return error.message;
  }

  // Se o erro tiver uma propriedade error diretamente
  if (error.error) {
    return typeof error.error === 'string' ? error.error : String(error.error);
  }

  // Se o erro for uma string, retorna ela
  if (typeof error === 'string') {
    return error;
  }

  // Fallback: mensagem genérica
  return 'Ocorreu um erro inesperado. Tente novamente.';
};