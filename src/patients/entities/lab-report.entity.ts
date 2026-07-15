import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LabReport {
  @Field()
  test: string;

  @Field()
  result: string;

  @Field()
  date: string;
}
