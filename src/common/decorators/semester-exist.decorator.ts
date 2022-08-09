import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataValidatorService } from 'src/config/services/data-validator.service';
import { rm } from '../constants';

@ValidatorConstraint({ name: 'SemesterExist', async: true })
@Injectable()
export class SemesterExistsRule implements ValidatorConstraintInterface {
  constructor(@Inject(DataValidatorService) private readonly validator: DataValidatorService) {}

  async validate(semesterId: number) {
    try {
      await this.validator.checkNotFoundSemester(semesterId);
    } catch (error) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return rm.NO_SEMESTER;
  }
}

export const SemesterExist = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'SemesterExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: SemesterExistsRule,
    });
  };
};
