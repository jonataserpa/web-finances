import { SetMetadata } from '@nestjs/common';

export const AccessControl = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
