import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { property = 'userName' } = validationArguments;
    return this.userService.isExist(property, value).then((user) => !user);
  }

  defaultMessage(): string {
    return '$property ($value) is already been taken';
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
