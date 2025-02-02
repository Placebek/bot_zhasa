import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = '№№№№№№№№№№№№'; 

  constructor() { }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Ошибка при Входы:', error);
      throw error;
    }
  }

  async register(email: string, password: string, username: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, { email, password, username });
      return response.data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  }
}
