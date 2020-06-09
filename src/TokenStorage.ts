import axios, { AxiosRequestConfig } from 'axios';
//import { ApiUrlService } from 'shared/services';
import { Promise } from 'es6-promise';

export class TokenStorage {

    private static readonly LOCAL_STORAGE_TOKEN = 'token';
    private static readonly LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

    public static isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    public static getAuthentication(): AxiosRequestConfig {
        return {
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        };
    }

    public static getNewToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            const userId = localStorage.getItem('passUserId')
            const password = localStorage.getItem('passPassword')

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ' Basic bWFuc2V0Om1hbnNldDEyMyFAIw=='
                }
            };
    
            fetch('http://www.pass-pdam.com:8585/auth/oauth/token?username=' + userId + "&password=" + password + "&grant_type=password", requestOptions)
                .then(response => response.json())
                .then((jsonData) => { // jsonData is parsed json object received from url
                    localStorage.setItem('passAccessToken', jsonData.access_token)
                    resolve(jsonData.access_token);
                })
                .catch((error) => {
                    reject(error);
                })

            // axios
            //     .post('http://www.pass-pdam.com:8585/auth/oauth/token?username=' + userId + "&password=" + password + "&grant_type=password")
            //     .then(response => {
            //         console.log(response)
            //         localStorage.setItem('passAccessToken', response.access_token)
            //         // this.storeToken(response.access_token);
            //         // this.storeRefreshToken(response.refresh_token);

            //         resolve(response.data.token);
            //     })
            //     .catch((error) => {
            //         console.error('ada error')
            //         reject(error);
            //     });
        });
    }

    public static storeToken(token: string): void {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
    }

    public static storeRefreshToken(refreshToken: string): void {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    }

    public static clear(): void {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    private static getRefreshToken(): string | null {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    private static getToken(): string | null {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }
}