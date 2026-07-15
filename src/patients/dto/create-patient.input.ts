import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsString, IsOptional, IsIn } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  age: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  condition: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsIn(['Stable', 'Critical'])
  status: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
