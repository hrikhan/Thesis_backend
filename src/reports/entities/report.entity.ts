import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  patientName: string;

  @Field()
  category: string;

  @Field()
  date: string;

  @Field()
  status: string;

  @Field()
  resultValue: string;

  @Field()
  referenceRange: string;

  @Field()
  technician: string;
}
