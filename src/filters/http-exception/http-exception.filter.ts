import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = exception.message;

    let validationMsg: any = exception.getResponse();
    // console.log(validationMsg, '---')
    if (typeof validationMsg === 'object') {
      validationMsg = Array.isArray(validationMsg.message)
        ? validationMsg.message[0]
        : validationMsg.messag;
    }
    Logger.error(`[错误] - ${request.url}: ${validationMsg || message}`);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      code: status,
      message: validationMsg || message,
    });
  }
}
