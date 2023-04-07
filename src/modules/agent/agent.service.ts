import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateAgentBundleDto } from './dto/create-agent-bundle.dto';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(private readonly httpService: HttpService) {}
  create(createAgentDto: CreateAgentDto) {
    return 'This action adds a new agent';
  }

  async getOssToken(url, token): Promise<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(url, {
          headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            const { code } = error;
            // 记录异常信息到错误列表中
            throw new HttpException(code, HttpStatus.INTERNAL_SERVER_ERROR);
          }),
        ),
    );

    if (data.code === 0) {
      return data.data;
    }

    throw new BadRequestException(data.message);
  }

  async batchPost(url: string, token: string, data: any[]): Promise<any> {
    const batchSize = 10; // 每次批量发送的请求数量
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const errorList = [];

    for (let i = 0; i < data.length; i += batchSize) {
      // 每次取出 batchSize 条数据进行处理
      const chunk = data.slice(i, i + batchSize);

      // 使用 Promise.all() 批量处理 HTTP 请求
      const promises = chunk.map((item) =>
        firstValueFrom(
          this.httpService
            .post(url.replace('%id%', item.id), item, { headers })
            .pipe(
              catchError((error: AxiosError) => {
                const {
                  response: { status, data },
                } = error;
                // 记录异常信息到错误列表中
                throw new HttpException(data, status);
              }),
            ),
        ),
      );
      const resultsChunk = await Promise.all(promises);
      resultsChunk.forEach((item) => {
        const { status, data, config } = item;
        if (status !== 200 || data.code !== 0) {
          errorList.push({
            code: status === 200 ? data.code : status,
            message: data.message,
            data: config.data,
          });
        }
      });
    }

    return errorList;
  }

  createBundle(createBundleDto: CreateAgentBundleDto) {
    // console.log(createBundleDto);
    return this.batchPost(
      createBundleDto.api,
      createBundleDto.token,
      createBundleDto.data,
    );
  }

  findAll() {
    return `This action returns all agent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
