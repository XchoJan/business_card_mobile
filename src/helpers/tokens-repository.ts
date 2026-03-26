import { KeyValueRepository } from './key-value-repository';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const SELECTED_CITY = 'selectedCity'

export class TokensRepository {
  public static setAccessToken(token: string): void {
    KeyValueRepository.setItem(ACCESS_TOKEN, JSON.stringify(token));
  }

  public static getAccessToken(): string | null {
    return KeyValueRepository.getItem<string>(ACCESS_TOKEN);
  }

  public static removeAccessToken(): void {
    return KeyValueRepository.removeItem(ACCESS_TOKEN);
  }

  public static setRefreshToken(token: string): void {
    KeyValueRepository.setItem(REFRESH_TOKEN, JSON.stringify(token));
  }

  public static getRefreshToken(): string | null {
    return KeyValueRepository.getItem<string>(REFRESH_TOKEN);
  }

  public static setSelectedCity(city: string): void {
    KeyValueRepository.setItem(SELECTED_CITY, JSON.stringify(city));
  }

  public static getSelectedCity(): string | null {
    return KeyValueRepository.getItem<string>(SELECTED_CITY);
  }

  public static removeSelectedCity(): void {
    KeyValueRepository.removeItem(SELECTED_CITY);
  }

}
