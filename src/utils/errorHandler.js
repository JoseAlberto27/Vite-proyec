export function getErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Ocurrio un error inesperado. Intentalo nuevamente.';
}
