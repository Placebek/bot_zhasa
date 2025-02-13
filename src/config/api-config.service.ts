import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  public readonly authHeader: string;
  public readonly apiURL: string;

  constructor(
    private readonly configService: ConfigService
  ) {
    const username = this.configService.get<string>('basicAuth.username');
    const password = this.configService.get<string>('basicAuth.password');
    const apiUrl = this.configService.get<string>('apiUrl');

    if (!username || !password) {
      throw new Error('Basic Auth: Username or password is missing');
    }

    if (!apiUrl) {
      throw new Error('API_URL is missing in .env');
    }

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    this.authHeader = `Basic ${credentials}`;
    this.apiURL = apiUrl;
  }
}
