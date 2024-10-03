export const getApiUrl = (extension: string) => {
  return import.meta.env.API_URL
    ? `${import.meta.env.API_URL}/${extension}`
    : `http://localhost:3000/api/v1/${extension}`;
};
