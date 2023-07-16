import { ObjectType, InputType, Field, Int } from 'type-graphql'

@ObjectType()
export class Part {
  @Field()
  id!: string

  @Field()
  brand!: string

  @Field()
  name!: string

  @Field()
  model!: string

  @Field()
  description!: string

  @Field()
  bin!: string

  @Field()
  container!: string

  @Field()
  location!: string

  @Field(() => Int)
  quantity!: number

  @Field(() => [String])
  tags!: string[]
}

@InputType()
export class PartFilter {
  @Field({ nullable: true })
  keyword?: string
}
