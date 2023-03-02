import mem from 'mem';
import storage from '@src/utils/api/storage';
import { fetchRefreshToken } from '@src/services';
import { Base64 } from 'js-base64';
import { isValidJsonString } from '@src/utils';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { store } from '@src/store';
import * as constants from 'src/utils/constants';
import { logout } from '@src/store/actionCreators/auth';

interface AccessTokenOutput {
  token: string;
  platform: string;
}

export const checkTokenIsExpired = () => {
  const token = storage.loadData(constants.accessTokenKey);

  if (token) {
    try {
      const tokenRecipe = Base64.decode(token);

      if (isValidJsonString(tokenRecipe)) {
        const accessTokenRecipe: AccessTokenOutput = JSON.parse(tokenRecipe);
        const { token: encodedToken } = accessTokenRecipe;
        const accessTokenInfo = jwtDecode<JwtPayload>(encodedToken);
        const { exp } = accessTokenInfo;

        const currentTime = Date.now() / 1000;

        return !!(exp && exp < currentTime);
      }

      store.dispatch(logout());
    } catch (err) {
      store.dispatch(logout());
    }
  }

  return false;
};

const refreshToken = async () => {
  const token = storage.loadData(constants.refreshTokenKey);

  if (token) {
    try {
      if (isValidJsonString(token)) {
        const refreshToken = JSON.parse(token);

        const { auth } = store.getState();
        const { profile } = auth;

        const username = profile?.email;

        if (username) {
          const data = { refreshToken, username };

          const response = await fetchRefreshToken(data);

          if (response.data) {
            const { token: accessToken } = response.data;

            storage.saveData(constants.accessTokenKey, JSON.stringify(accessToken));

            return { accessToken };
          }
        }
      }

      store.dispatch(logout());
    } catch (err) {
      store.dispatch(logout());
    }
  }

  return { accessToken: null };
};

const maxAge = 10000;

export const memoizedCheckTokenIsExpired = mem(checkTokenIsExpired, { maxAge });
export const memoizedRefreshToken = mem(refreshToken, { maxAge });
