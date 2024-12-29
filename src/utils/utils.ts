import { Item } from '@core/Entities';
import { TokenInfo } from '@interfaces';

const isStackable = (item: Item): boolean => {
  return item.amount != 1;
};

const getScreenWidth = (): number => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

const getScreenHeight = (): number => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};

const parseToken = (token: string): TokenInfo => {
  const base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64Payload)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
};

const tokenExpired = (token: string) => {
  try {
    const payload = parseToken(token);

    const currentTime = Date.now();
    const expireTime = payload.exp * 1000;

    return currentTime >= expireTime - 10 * 1000; // 10 second back
  } catch (e) {
    return true;
  }
};

export { isStackable, getScreenWidth, getScreenHeight, parseToken, tokenExpired };
