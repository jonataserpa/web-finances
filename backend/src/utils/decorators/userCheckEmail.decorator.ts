import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

/**
 * Checks if the email of the token is the same as the email of the parameter or body
 */
export const UserCheckEmail = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const xemail = request.headers['x-email'];

    const param = request.params.email;
    const body = request.body.email;

    if (
      (param && param !== xemail) ||
      (body && body !== xemail) ||
      (!param && !body)
    ) {
      throw new BadRequestException('Emails are not the same');
    }

    return request.body.email ? request.body : request.params;
  },
);
