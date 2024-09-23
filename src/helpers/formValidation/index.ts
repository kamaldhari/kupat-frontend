export const emailValidation = async (_: unknown, value: string): Promise<void> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value) {
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('אנא הזן כתובת דוא"ל תקנית'));
    }
  }

  return Promise.resolve();
};

export const nameValidation = async (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error('נא להזין מספר טלפון'));
  }
  return Promise.resolve();
};
