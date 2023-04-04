import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Code } from 'typeorm';
import { CreateAgentBundleDto } from './dto/create-agent-bundle.dto';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(private readonly httpService: HttpService) {}
  create(createAgentDto: CreateAgentDto) {
    return 'This action adds a new agent';
  }

  makeHttpRequest(url, token, values): Promise<boolean> {
    const errorList = [];
    values.forEach(async (value) => {
      if (url.indexOf('%id%') > -1) {
        url = url.replace('%id%', value.id);
        delete value.id;
      }
      try {
        const { data } = await firstValueFrom(
          this.httpService
            .post(url, value, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .pipe(
              catchError((error: AxiosError) => {
                console.log(error);
                throw 'An error happened!';
              }),
            ),
        );
        if (data.code !== 0) {
          throw data.message;
        }
      } catch (e) {
        errorList.push(value);
      }
    });

    if (errorList.length > 0) {
      throw new BadRequestException(JSON.stringify(errorList));
    }

    return null;
  }

  createBundle(createBundleDto: CreateAgentBundleDto) {
    return this.makeHttpRequest(
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
