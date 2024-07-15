export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const BASE_URL = 'https://sandbox.creos.me/api/v1/';

export const makeAvatarPath = (name: string) => `https://sandbox.creos.me/media/images/avatars/${name}.jpg`;
