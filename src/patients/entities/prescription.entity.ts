import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Prescription {
  @Field()
  medication: string;

  @Field()
  dosage: string;

  @Field()
  frequency: string;
}
