import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import {
  CreateAgentBundleDto,
  AgentOssTokenDto,
  UploadBundleDto,
} from './dto/create-agent-bundle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AdmZip from 'adm-zip';
import * as path from 'path';
// const AdmZip = require("adm-zip");
// const path = require('path');

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @Post('/bundle')
  createBundle(@Body() createBundleDto: CreateAgentBundleDto) {
    return this.agentService.createBundle(createBundleDto);
  }

  @Post('/upload/buddle')
  @UseInterceptors(FileInterceptor('zip'))
  async uploadBundle(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'zip',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 30, // 1M
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() uploadBundleDto: UploadBundleDto,
  ) {
    const ossTempToken = await this.getOssToken(uploadBundleDto);
    console.log(ossTempToken);
    // {
    //   accessKeyId: 'TP50ROT73FHHZB2N791R',
    //   accessKeySecret: '8oKvy1XHaHKVGLs6l9YRUX6TReDYEAR84TFnrShA',
    //   securityToken: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJUUDUwUk9UNzNGSEhaQjJONzkxUiIsImV4cCI6MTY4MDg3MjMzMCwicGFyZW50IjoidXNlcm5hbWUiLCJzZXNzaW9uUG9saWN5IjoiZXlKV1pYSnphVzl1SWpvaU1qQXhNaTB4TUMweE55SXNJbE4wWVhSbGJXVnVkQ0k2VzNzaVUybGtJam9pVTNSdGRERWlMQ0pGWm1abFkzUWlPaUpCYkd4dmR5SXNJa0ZqZEdsdmJpSTZXeUp6TXpwUWRYUlBZbXBsWTNRaUxDSnpNenBIWlhSUFltcGxZM1FpWFN3aVVtVnpiM1Z5WTJVaU9pSmhjbTQ2WVhkek9uTXpPam82S2lKOVhYMD0ifQ.mmzm327lOsCBOESgPdGk85p_4jNVZueLPFl_eovLBQ4ecSrDXFT9-nRhO0MtE29E94mN0tqu7Ta8cj3rsbvDVw',
    //   endpoint: 'https://dwc-minio.softsugar.com',
    //   bucket: 'virtual-human-private',
    //   isPrivateCloud: 1
    // }

    this.extractZip(file);
  }

  extractZip(file: Express.Multer.File, accept?: string) {
    const zip = new AdmZip(file.buffer);
    const zipEntries = zip.getEntries();

    const promises = [];

    zipEntries.forEach((zipEntry) => {
      if (!accept || zipEntry.entryName.endsWith(accept)) {
        const content = zipEntry.getData().toString('utf8');
        const filename = path.basename(zipEntry.entryName);
        // upload oss
        // const promise = client.put(filename, Buffer.from(content));
        // promises.push(promise);
      }
    });

    Promise.all(promises)
      .then(() => {
        console.log('All files uploaded to OSS');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getOssToken(ossTokenDto: AgentOssTokenDto) {
    return this.agentService.getOssToken(ossTokenDto.api, ossTokenDto.token);
  }

  @Get()
  findAll() {
    return this.agentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }
}
