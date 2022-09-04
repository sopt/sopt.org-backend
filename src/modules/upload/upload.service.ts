import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { client_email, private_key } from '../../config/google-client.json';
import { PrismaService } from '../prisma/prisma.service';
import { UploadType } from './common/upload.type';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService, private readonly config: ApiConfigService) {}

  //TODO 임원진 데이터 업로드
  // async uploadLeader(dto: UploadSheetReqDTO) {
  //   const sheetData = await this.getSheetData('leader', `A${dto.startRange}:H${dto.endRange}`);
  // }

  //^ 시트 데이터 조회
  private async getSheetData(type: UploadType, range: string, semesterId?: number): Promise<string[][]> {
    switch (type) {
      case 'leader':
        const leaderSheetId = this.config.googleSheetConfig.leaderSheetId;
        return await this.getContext(leaderSheetId, `${semesterId}기`, range);
    }
  }

  private async getContext(spreadsheetId: string, gid: string, range: string): Promise<string[][]> {
    const auth = new google.auth.JWT(client_email, null, private_key, ['https://www.googleapis.com/auth/spreadsheets']);
    const googleSheet = google.sheets({
      version: 'v4',
      auth,
    });
    const context = await googleSheet.spreadsheets.values.get({
      spreadsheetId,
      range: `'${gid}'!${range}`,
    });

    return context.data.values;
  }
}
