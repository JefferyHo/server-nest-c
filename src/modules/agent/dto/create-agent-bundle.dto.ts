export class CreateAgentBundleDto {
  api: string;

  data: Array<any>;

  token: string;
}

export class AgentOssTokenDto {
  api: string;

  token: string;
}

export class UploadBundleDto extends AgentOssTokenDto {
  zip: File;
}
