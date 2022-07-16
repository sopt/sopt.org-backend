import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + '은/는 설정되지 않은 환경 변수 입니다.');
    }

    return value;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + '의 타입이 Number가 아닙니다.');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + '의 타입이 Boolean이 아닙니다.');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get dbConfig() {
    return {
      dbSchema: this.getString('SCHEMA_NAME'),
      dbUrl: this.getString('DATABASE_URL'),
    };
  }

  get awsS3Config() {
    return {
      bucket: this.getString('AWS_BUCKET'),
      bucketAccessKey: this.getString('AWS_ACCESS_KEY'),
      bucketSecretKey: this.getString('AWS_SECRET_ACCESS_KEY'),
      bucketRegion: this.getString('AWS_REGION'),
    };
  }
}
