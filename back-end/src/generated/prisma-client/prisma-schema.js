module.exports = {
        typeDefs: /* GraphQL */ `type Address {
  id: ID!
  addressLine1: String!
  addressLine2: String
  city: String!
  postcode: Int
  country: String!
}

type AddressConnection {
  pageInfo: PageInfo!
  edges: [AddressEdge]!
  aggregate: AggregateAddress!
}

input AddressCreateInput {
  addressLine1: String!
  addressLine2: String
  city: String!
  postcode: Int
  country: String!
}

input AddressCreateOneInput {
  create: AddressCreateInput
  connect: AddressWhereUniqueInput
}

type AddressEdge {
  node: Address!
  cursor: String!
}

enum AddressOrderByInput {
  id_ASC
  id_DESC
  addressLine1_ASC
  addressLine1_DESC
  addressLine2_ASC
  addressLine2_DESC
  city_ASC
  city_DESC
  postcode_ASC
  postcode_DESC
  country_ASC
  country_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input AddressUpdateDataInput {
  addressLine1: String
  addressLine2: String
  city: String
  postcode: Int
  country: String
}

input AddressUpdateInput {
  addressLine1: String
  addressLine2: String
  city: String
  postcode: Int
  country: String
}

input AddressUpdateManyMutationInput {
  addressLine1: String
  addressLine2: String
  city: String
  postcode: Int
  country: String
}

input AddressUpdateOneInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: AddressWhereUniqueInput
}

input AddressUpdateOneRequiredInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  connect: AddressWhereUniqueInput
}

input AddressUpsertNestedInput {
  update: AddressUpdateDataInput!
  create: AddressCreateInput!
}

input AddressWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  addressLine1: String
  addressLine1_not: String
  addressLine1_in: [String!]
  addressLine1_not_in: [String!]
  addressLine1_lt: String
  addressLine1_lte: String
  addressLine1_gt: String
  addressLine1_gte: String
  addressLine1_contains: String
  addressLine1_not_contains: String
  addressLine1_starts_with: String
  addressLine1_not_starts_with: String
  addressLine1_ends_with: String
  addressLine1_not_ends_with: String
  addressLine2: String
  addressLine2_not: String
  addressLine2_in: [String!]
  addressLine2_not_in: [String!]
  addressLine2_lt: String
  addressLine2_lte: String
  addressLine2_gt: String
  addressLine2_gte: String
  addressLine2_contains: String
  addressLine2_not_contains: String
  addressLine2_starts_with: String
  addressLine2_not_starts_with: String
  addressLine2_ends_with: String
  addressLine2_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  postcode: Int
  postcode_not: Int
  postcode_in: [Int!]
  postcode_not_in: [Int!]
  postcode_lt: Int
  postcode_lte: Int
  postcode_gt: Int
  postcode_gte: Int
  country: String
  country_not: String
  country_in: [String!]
  country_not_in: [String!]
  country_lt: String
  country_lte: String
  country_gt: String
  country_gte: String
  country_contains: String
  country_not_contains: String
  country_starts_with: String
  country_not_starts_with: String
  country_ends_with: String
  country_not_ends_with: String
  AND: [AddressWhereInput!]
  OR: [AddressWhereInput!]
  NOT: [AddressWhereInput!]
}

input AddressWhereUniqueInput {
  id: ID
}

type AggregateAddress {
  count: Int!
}

type AggregateFarm {
  count: Int!
}

type AggregateImage {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateSubscription {
  count: Int!
}

type AggregateSubscriptionItem {
  count: Int!
}

type AggregateUnit {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Farm {
  id: ID!
  title: String!
  email: String!
  phone: String
  website: String
  address: Address
  thumbnailImage: Image!
  largeImages(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type FarmConnection {
  pageInfo: PageInfo!
  edges: [FarmEdge]!
  aggregate: AggregateFarm!
}

input FarmCreateInput {
  title: String!
  email: String!
  phone: String
  website: String
  address: AddressCreateOneInput
  thumbnailImage: ImageCreateOneInput!
  largeImages: ImageCreateManyInput
}

input FarmCreateOneInput {
  create: FarmCreateInput
  connect: FarmWhereUniqueInput
}

type FarmEdge {
  node: Farm!
  cursor: String!
}

enum FarmOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  website_ASC
  website_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input FarmUpdateDataInput {
  title: String
  email: String
  phone: String
  website: String
  address: AddressUpdateOneInput
  thumbnailImage: ImageUpdateOneRequiredInput
  largeImages: ImageUpdateManyInput
}

input FarmUpdateInput {
  title: String
  email: String
  phone: String
  website: String
  address: AddressUpdateOneInput
  thumbnailImage: ImageUpdateOneRequiredInput
  largeImages: ImageUpdateManyInput
}

input FarmUpdateManyMutationInput {
  title: String
  email: String
  phone: String
  website: String
}

input FarmUpdateOneInput {
  create: FarmCreateInput
  update: FarmUpdateDataInput
  upsert: FarmUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: FarmWhereUniqueInput
}

input FarmUpsertNestedInput {
  update: FarmUpdateDataInput!
  create: FarmCreateInput!
}

input FarmWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  website: String
  website_not: String
  website_in: [String!]
  website_not_in: [String!]
  website_lt: String
  website_lte: String
  website_gt: String
  website_gte: String
  website_contains: String
  website_not_contains: String
  website_starts_with: String
  website_not_starts_with: String
  website_ends_with: String
  website_not_ends_with: String
  address: AddressWhereInput
  thumbnailImage: ImageWhereInput
  largeImages_every: ImageWhereInput
  largeImages_some: ImageWhereInput
  largeImages_none: ImageWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [FarmWhereInput!]
  OR: [FarmWhereInput!]
  NOT: [FarmWhereInput!]
}

input FarmWhereUniqueInput {
  id: ID
}

type Image {
  id: ID!
  itemId: String
  url: String!
}

type ImageConnection {
  pageInfo: PageInfo!
  edges: [ImageEdge]!
  aggregate: AggregateImage!
}

input ImageCreateInput {
  itemId: String
  url: String!
}

input ImageCreateManyInput {
  create: [ImageCreateInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateOneInput {
  create: ImageCreateInput
  connect: ImageWhereUniqueInput
}

type ImageEdge {
  node: Image!
  cursor: String!
}

enum ImageOrderByInput {
  id_ASC
  id_DESC
  itemId_ASC
  itemId_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input ImageScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  itemId: String
  itemId_not: String
  itemId_in: [String!]
  itemId_not_in: [String!]
  itemId_lt: String
  itemId_lte: String
  itemId_gt: String
  itemId_gte: String
  itemId_contains: String
  itemId_not_contains: String
  itemId_starts_with: String
  itemId_not_starts_with: String
  itemId_ends_with: String
  itemId_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [ImageScalarWhereInput!]
  OR: [ImageScalarWhereInput!]
  NOT: [ImageScalarWhereInput!]
}

input ImageUpdateDataInput {
  itemId: String
  url: String
}

input ImageUpdateInput {
  itemId: String
  url: String
}

input ImageUpdateManyDataInput {
  itemId: String
  url: String
}

input ImageUpdateManyInput {
  create: [ImageCreateInput!]
  update: [ImageUpdateWithWhereUniqueNestedInput!]
  upsert: [ImageUpsertWithWhereUniqueNestedInput!]
  delete: [ImageWhereUniqueInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  deleteMany: [ImageScalarWhereInput!]
  updateMany: [ImageUpdateManyWithWhereNestedInput!]
}

input ImageUpdateManyMutationInput {
  itemId: String
  url: String
}

input ImageUpdateManyWithWhereNestedInput {
  where: ImageScalarWhereInput!
  data: ImageUpdateManyDataInput!
}

input ImageUpdateOneInput {
  create: ImageCreateInput
  update: ImageUpdateDataInput
  upsert: ImageUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ImageWhereUniqueInput
}

input ImageUpdateOneRequiredInput {
  create: ImageCreateInput
  update: ImageUpdateDataInput
  upsert: ImageUpsertNestedInput
  connect: ImageWhereUniqueInput
}

input ImageUpdateWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateDataInput!
}

input ImageUpsertNestedInput {
  update: ImageUpdateDataInput!
  create: ImageCreateInput!
}

input ImageUpsertWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateDataInput!
  create: ImageCreateInput!
}

input ImageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  itemId: String
  itemId_not: String
  itemId_in: [String!]
  itemId_not_in: [String!]
  itemId_lt: String
  itemId_lte: String
  itemId_gt: String
  itemId_gte: String
  itemId_contains: String
  itemId_not_contains: String
  itemId_starts_with: String
  itemId_not_starts_with: String
  itemId_ends_with: String
  itemId_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [ImageWhereInput!]
  OR: [ImageWhereInput!]
  NOT: [ImageWhereInput!]
}

input ImageWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAddress(data: AddressCreateInput!): Address!
  updateAddress(data: AddressUpdateInput!, where: AddressWhereUniqueInput!): Address
  updateManyAddresses(data: AddressUpdateManyMutationInput!, where: AddressWhereInput): BatchPayload!
  upsertAddress(where: AddressWhereUniqueInput!, create: AddressCreateInput!, update: AddressUpdateInput!): Address!
  deleteAddress(where: AddressWhereUniqueInput!): Address
  deleteManyAddresses(where: AddressWhereInput): BatchPayload!
  createFarm(data: FarmCreateInput!): Farm!
  updateFarm(data: FarmUpdateInput!, where: FarmWhereUniqueInput!): Farm
  updateManyFarms(data: FarmUpdateManyMutationInput!, where: FarmWhereInput): BatchPayload!
  upsertFarm(where: FarmWhereUniqueInput!, create: FarmCreateInput!, update: FarmUpdateInput!): Farm!
  deleteFarm(where: FarmWhereUniqueInput!): Farm
  deleteManyFarms(where: FarmWhereInput): BatchPayload!
  createImage(data: ImageCreateInput!): Image!
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  updateManyImages(data: ImageUpdateManyMutationInput!, where: ImageWhereInput): BatchPayload!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  deleteImage(where: ImageWhereUniqueInput!): Image
  deleteManyImages(where: ImageWhereInput): BatchPayload!
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createSubscription(data: SubscriptionCreateInput!): Subscription!
  updateSubscription(data: SubscriptionUpdateInput!, where: SubscriptionWhereUniqueInput!): Subscription
  updateManySubscriptions(data: SubscriptionUpdateManyMutationInput!, where: SubscriptionWhereInput): BatchPayload!
  upsertSubscription(where: SubscriptionWhereUniqueInput!, create: SubscriptionCreateInput!, update: SubscriptionUpdateInput!): Subscription!
  deleteSubscription(where: SubscriptionWhereUniqueInput!): Subscription
  deleteManySubscriptions(where: SubscriptionWhereInput): BatchPayload!
  createSubscriptionItem(data: SubscriptionItemCreateInput!): SubscriptionItem!
  updateSubscriptionItem(data: SubscriptionItemUpdateInput!, where: SubscriptionItemWhereUniqueInput!): SubscriptionItem
  updateManySubscriptionItems(data: SubscriptionItemUpdateManyMutationInput!, where: SubscriptionItemWhereInput): BatchPayload!
  upsertSubscriptionItem(where: SubscriptionItemWhereUniqueInput!, create: SubscriptionItemCreateInput!, update: SubscriptionItemUpdateInput!): SubscriptionItem!
  deleteSubscriptionItem(where: SubscriptionItemWhereUniqueInput!): SubscriptionItem
  deleteManySubscriptionItems(where: SubscriptionItemWhereInput): BatchPayload!
  createUnit(data: UnitCreateInput!): Unit!
  updateUnit(data: UnitUpdateInput!, where: UnitWhereUniqueInput!): Unit
  updateManyUnits(data: UnitUpdateManyMutationInput!, where: UnitWhereInput): BatchPayload!
  upsertUnit(where: UnitWhereUniqueInput!, create: UnitCreateInput!, update: UnitUpdateInput!): Unit!
  deleteUnit(where: UnitWhereUniqueInput!): Unit
  deleteManyUnits(where: UnitWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

interface Node {
  id: ID!
}

type Order {
  id: ID!
  userId: String!
  subscriptionId: String!
  billingAddress: Address!
  shippingAddress: Address!
  deliveryDate: DateTime
  paymentDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  userId: String!
  subscriptionId: String!
  billingAddress: AddressCreateOneInput!
  shippingAddress: AddressCreateOneInput!
  deliveryDate: DateTime
  paymentDate: DateTime
}

type OrderEdge {
  node: Order!
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  userId_ASC
  userId_DESC
  subscriptionId_ASC
  subscriptionId_DESC
  deliveryDate_ASC
  deliveryDate_DESC
  paymentDate_ASC
  paymentDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input OrderUpdateInput {
  userId: String
  subscriptionId: String
  billingAddress: AddressUpdateOneRequiredInput
  shippingAddress: AddressUpdateOneRequiredInput
  deliveryDate: DateTime
  paymentDate: DateTime
}

input OrderUpdateManyMutationInput {
  userId: String
  subscriptionId: String
  deliveryDate: DateTime
  paymentDate: DateTime
}

input OrderWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  userId: String
  userId_not: String
  userId_in: [String!]
  userId_not_in: [String!]
  userId_lt: String
  userId_lte: String
  userId_gt: String
  userId_gte: String
  userId_contains: String
  userId_not_contains: String
  userId_starts_with: String
  userId_not_starts_with: String
  userId_ends_with: String
  userId_not_ends_with: String
  subscriptionId: String
  subscriptionId_not: String
  subscriptionId_in: [String!]
  subscriptionId_not_in: [String!]
  subscriptionId_lt: String
  subscriptionId_lte: String
  subscriptionId_gt: String
  subscriptionId_gte: String
  subscriptionId_contains: String
  subscriptionId_not_contains: String
  subscriptionId_starts_with: String
  subscriptionId_not_starts_with: String
  subscriptionId_ends_with: String
  subscriptionId_not_ends_with: String
  billingAddress: AddressWhereInput
  shippingAddress: AddressWhereInput
  deliveryDate: DateTime
  deliveryDate_not: DateTime
  deliveryDate_in: [DateTime!]
  deliveryDate_not_in: [DateTime!]
  deliveryDate_lt: DateTime
  deliveryDate_lte: DateTime
  deliveryDate_gt: DateTime
  deliveryDate_gte: DateTime
  paymentDate: DateTime
  paymentDate_not: DateTime
  paymentDate_in: [DateTime!]
  paymentDate_not_in: [DateTime!]
  paymentDate_lt: DateTime
  paymentDate_lte: DateTime
  paymentDate_gt: DateTime
  paymentDate_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Product {
  id: ID!
  title: String!
  shortDescription: String!
  longDescription: String!
  thumbnailImage: Image!
  largeImages(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  unit: Unit!
  farm: Farm
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  title: String!
  shortDescription: String!
  longDescription: String!
  thumbnailImage: ImageCreateOneInput!
  largeImages: ImageCreateManyInput
  unit: UnitCreateOneInput!
  farm: FarmCreateOneInput
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  shortDescription_ASC
  shortDescription_DESC
  longDescription_ASC
  longDescription_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input ProductUpdateInput {
  title: String
  shortDescription: String
  longDescription: String
  thumbnailImage: ImageUpdateOneRequiredInput
  largeImages: ImageUpdateManyInput
  unit: UnitUpdateOneRequiredInput
  farm: FarmUpdateOneInput
}

input ProductUpdateManyMutationInput {
  title: String
  shortDescription: String
  longDescription: String
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  shortDescription: String
  shortDescription_not: String
  shortDescription_in: [String!]
  shortDescription_not_in: [String!]
  shortDescription_lt: String
  shortDescription_lte: String
  shortDescription_gt: String
  shortDescription_gte: String
  shortDescription_contains: String
  shortDescription_not_contains: String
  shortDescription_starts_with: String
  shortDescription_not_starts_with: String
  shortDescription_ends_with: String
  shortDescription_not_ends_with: String
  longDescription: String
  longDescription_not: String
  longDescription_in: [String!]
  longDescription_not_in: [String!]
  longDescription_lt: String
  longDescription_lte: String
  longDescription_gt: String
  longDescription_gte: String
  longDescription_contains: String
  longDescription_not_contains: String
  longDescription_starts_with: String
  longDescription_not_starts_with: String
  longDescription_ends_with: String
  longDescription_not_ends_with: String
  thumbnailImage: ImageWhereInput
  largeImages_every: ImageWhereInput
  largeImages_some: ImageWhereInput
  largeImages_none: ImageWhereInput
  unit: UnitWhereInput
  farm: FarmWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
}

type Query {
  address(where: AddressWhereUniqueInput!): Address
  addresses(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Address]!
  addressesConnection(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AddressConnection!
  farm(where: FarmWhereUniqueInput!): Farm
  farms(where: FarmWhereInput, orderBy: FarmOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Farm]!
  farmsConnection(where: FarmWhereInput, orderBy: FarmOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FarmConnection!
  image(where: ImageWhereUniqueInput!): Image
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  imagesConnection(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageConnection!
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  subscription(where: SubscriptionWhereUniqueInput!): Subscription
  subscriptions(where: SubscriptionWhereInput, orderBy: SubscriptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subscription]!
  subscriptionsConnection(where: SubscriptionWhereInput, orderBy: SubscriptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubscriptionConnection!
  subscriptionItem(where: SubscriptionItemWhereUniqueInput!): SubscriptionItem
  subscriptionItems(where: SubscriptionItemWhereInput, orderBy: SubscriptionItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubscriptionItem]!
  subscriptionItemsConnection(where: SubscriptionItemWhereInput, orderBy: SubscriptionItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubscriptionItemConnection!
  unit(where: UnitWhereUniqueInput!): Unit
  units(where: UnitWhereInput, orderBy: UnitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Unit]!
  unitsConnection(where: UnitWhereInput, orderBy: UnitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UnitConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  id: ID!
  title: String!
  shortDescription: String!
  longDescription: String!
  totalPrice: Int!
  mealPrice: Int
  thumbnailImage: Image!
  largeImages(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  items(where: SubscriptionItemWhereInput, orderBy: SubscriptionItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubscriptionItem!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SubscriptionConnection {
  pageInfo: PageInfo!
  edges: [SubscriptionEdge]!
  aggregate: AggregateSubscription!
}

input SubscriptionCreateInput {
  title: String!
  shortDescription: String!
  longDescription: String!
  totalPrice: Int!
  mealPrice: Int
  thumbnailImage: ImageCreateOneInput!
  largeImages: ImageCreateManyInput
  items: SubscriptionItemCreateManyInput
}

type SubscriptionEdge {
  node: Subscription!
  cursor: String!
}

type SubscriptionItem {
  id: ID!
  subscriptionId: String!
  productId: String!
  quantity: Int!
  price: Int!
}

type SubscriptionItemConnection {
  pageInfo: PageInfo!
  edges: [SubscriptionItemEdge]!
  aggregate: AggregateSubscriptionItem!
}

input SubscriptionItemCreateInput {
  subscriptionId: String!
  productId: String!
  quantity: Int!
  price: Int!
}

input SubscriptionItemCreateManyInput {
  create: [SubscriptionItemCreateInput!]
  connect: [SubscriptionItemWhereUniqueInput!]
}

type SubscriptionItemEdge {
  node: SubscriptionItem!
  cursor: String!
}

enum SubscriptionItemOrderByInput {
  id_ASC
  id_DESC
  subscriptionId_ASC
  subscriptionId_DESC
  productId_ASC
  productId_DESC
  quantity_ASC
  quantity_DESC
  price_ASC
  price_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input SubscriptionItemScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  subscriptionId: String
  subscriptionId_not: String
  subscriptionId_in: [String!]
  subscriptionId_not_in: [String!]
  subscriptionId_lt: String
  subscriptionId_lte: String
  subscriptionId_gt: String
  subscriptionId_gte: String
  subscriptionId_contains: String
  subscriptionId_not_contains: String
  subscriptionId_starts_with: String
  subscriptionId_not_starts_with: String
  subscriptionId_ends_with: String
  subscriptionId_not_ends_with: String
  productId: String
  productId_not: String
  productId_in: [String!]
  productId_not_in: [String!]
  productId_lt: String
  productId_lte: String
  productId_gt: String
  productId_gte: String
  productId_contains: String
  productId_not_contains: String
  productId_starts_with: String
  productId_not_starts_with: String
  productId_ends_with: String
  productId_not_ends_with: String
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  price: Int
  price_not: Int
  price_in: [Int!]
  price_not_in: [Int!]
  price_lt: Int
  price_lte: Int
  price_gt: Int
  price_gte: Int
  AND: [SubscriptionItemScalarWhereInput!]
  OR: [SubscriptionItemScalarWhereInput!]
  NOT: [SubscriptionItemScalarWhereInput!]
}

input SubscriptionItemUpdateDataInput {
  subscriptionId: String
  productId: String
  quantity: Int
  price: Int
}

input SubscriptionItemUpdateInput {
  subscriptionId: String
  productId: String
  quantity: Int
  price: Int
}

input SubscriptionItemUpdateManyDataInput {
  subscriptionId: String
  productId: String
  quantity: Int
  price: Int
}

input SubscriptionItemUpdateManyInput {
  create: [SubscriptionItemCreateInput!]
  update: [SubscriptionItemUpdateWithWhereUniqueNestedInput!]
  upsert: [SubscriptionItemUpsertWithWhereUniqueNestedInput!]
  delete: [SubscriptionItemWhereUniqueInput!]
  connect: [SubscriptionItemWhereUniqueInput!]
  disconnect: [SubscriptionItemWhereUniqueInput!]
  deleteMany: [SubscriptionItemScalarWhereInput!]
  updateMany: [SubscriptionItemUpdateManyWithWhereNestedInput!]
}

input SubscriptionItemUpdateManyMutationInput {
  subscriptionId: String
  productId: String
  quantity: Int
  price: Int
}

input SubscriptionItemUpdateManyWithWhereNestedInput {
  where: SubscriptionItemScalarWhereInput!
  data: SubscriptionItemUpdateManyDataInput!
}

input SubscriptionItemUpdateWithWhereUniqueNestedInput {
  where: SubscriptionItemWhereUniqueInput!
  data: SubscriptionItemUpdateDataInput!
}

input SubscriptionItemUpsertWithWhereUniqueNestedInput {
  where: SubscriptionItemWhereUniqueInput!
  update: SubscriptionItemUpdateDataInput!
  create: SubscriptionItemCreateInput!
}

input SubscriptionItemWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  subscriptionId: String
  subscriptionId_not: String
  subscriptionId_in: [String!]
  subscriptionId_not_in: [String!]
  subscriptionId_lt: String
  subscriptionId_lte: String
  subscriptionId_gt: String
  subscriptionId_gte: String
  subscriptionId_contains: String
  subscriptionId_not_contains: String
  subscriptionId_starts_with: String
  subscriptionId_not_starts_with: String
  subscriptionId_ends_with: String
  subscriptionId_not_ends_with: String
  productId: String
  productId_not: String
  productId_in: [String!]
  productId_not_in: [String!]
  productId_lt: String
  productId_lte: String
  productId_gt: String
  productId_gte: String
  productId_contains: String
  productId_not_contains: String
  productId_starts_with: String
  productId_not_starts_with: String
  productId_ends_with: String
  productId_not_ends_with: String
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  price: Int
  price_not: Int
  price_in: [Int!]
  price_not_in: [Int!]
  price_lt: Int
  price_lte: Int
  price_gt: Int
  price_gte: Int
  AND: [SubscriptionItemWhereInput!]
  OR: [SubscriptionItemWhereInput!]
  NOT: [SubscriptionItemWhereInput!]
}

input SubscriptionItemWhereUniqueInput {
  id: ID
}

enum SubscriptionOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  shortDescription_ASC
  shortDescription_DESC
  longDescription_ASC
  longDescription_DESC
  totalPrice_ASC
  totalPrice_DESC
  mealPrice_ASC
  mealPrice_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input SubscriptionUpdateInput {
  title: String
  shortDescription: String
  longDescription: String
  totalPrice: Int
  mealPrice: Int
  thumbnailImage: ImageUpdateOneRequiredInput
  largeImages: ImageUpdateManyInput
  items: SubscriptionItemUpdateManyInput
}

input SubscriptionUpdateManyMutationInput {
  title: String
  shortDescription: String
  longDescription: String
  totalPrice: Int
  mealPrice: Int
}

input SubscriptionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  shortDescription: String
  shortDescription_not: String
  shortDescription_in: [String!]
  shortDescription_not_in: [String!]
  shortDescription_lt: String
  shortDescription_lte: String
  shortDescription_gt: String
  shortDescription_gte: String
  shortDescription_contains: String
  shortDescription_not_contains: String
  shortDescription_starts_with: String
  shortDescription_not_starts_with: String
  shortDescription_ends_with: String
  shortDescription_not_ends_with: String
  longDescription: String
  longDescription_not: String
  longDescription_in: [String!]
  longDescription_not_in: [String!]
  longDescription_lt: String
  longDescription_lte: String
  longDescription_gt: String
  longDescription_gte: String
  longDescription_contains: String
  longDescription_not_contains: String
  longDescription_starts_with: String
  longDescription_not_starts_with: String
  longDescription_ends_with: String
  longDescription_not_ends_with: String
  totalPrice: Int
  totalPrice_not: Int
  totalPrice_in: [Int!]
  totalPrice_not_in: [Int!]
  totalPrice_lt: Int
  totalPrice_lte: Int
  totalPrice_gt: Int
  totalPrice_gte: Int
  mealPrice: Int
  mealPrice_not: Int
  mealPrice_in: [Int!]
  mealPrice_not_in: [Int!]
  mealPrice_lt: Int
  mealPrice_lte: Int
  mealPrice_gt: Int
  mealPrice_gte: Int
  thumbnailImage: ImageWhereInput
  largeImages_every: ImageWhereInput
  largeImages_some: ImageWhereInput
  largeImages_none: ImageWhereInput
  items_every: SubscriptionItemWhereInput
  items_some: SubscriptionItemWhereInput
  items_none: SubscriptionItemWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [SubscriptionWhereInput!]
  OR: [SubscriptionWhereInput!]
  NOT: [SubscriptionWhereInput!]
}

input SubscriptionWhereUniqueInput {
  id: ID
}

type Unit {
  id: ID!
  label: String!
}

type UnitConnection {
  pageInfo: PageInfo!
  edges: [UnitEdge]!
  aggregate: AggregateUnit!
}

input UnitCreateInput {
  label: String!
}

input UnitCreateOneInput {
  create: UnitCreateInput
  connect: UnitWhereUniqueInput
}

type UnitEdge {
  node: Unit!
  cursor: String!
}

enum UnitOrderByInput {
  id_ASC
  id_DESC
  label_ASC
  label_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input UnitUpdateDataInput {
  label: String
}

input UnitUpdateInput {
  label: String
}

input UnitUpdateManyMutationInput {
  label: String
}

input UnitUpdateOneRequiredInput {
  create: UnitCreateInput
  update: UnitUpdateDataInput
  upsert: UnitUpsertNestedInput
  connect: UnitWhereUniqueInput
}

input UnitUpsertNestedInput {
  update: UnitUpdateDataInput!
  create: UnitCreateInput!
}

input UnitWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  AND: [UnitWhereInput!]
  OR: [UnitWhereInput!]
  NOT: [UnitWhereInput!]
}

input UnitWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  name: String!
  email: String!
  phone: String!
  billingAddress: Address!
  shippingAddress: Address!
  paymentId: String
  avatar: Image
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  phone: String!
  billingAddress: AddressCreateOneInput!
  shippingAddress: AddressCreateOneInput!
  paymentId: String
  avatar: ImageCreateOneInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  paymentId_ASC
  paymentId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input UserUpdateInput {
  name: String
  email: String
  phone: String
  billingAddress: AddressUpdateOneRequiredInput
  shippingAddress: AddressUpdateOneRequiredInput
  paymentId: String
  avatar: ImageUpdateOneInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  phone: String
  paymentId: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  billingAddress: AddressWhereInput
  shippingAddress: AddressWhereInput
  paymentId: String
  paymentId_not: String
  paymentId_in: [String!]
  paymentId_not_in: [String!]
  paymentId_lt: String
  paymentId_lte: String
  paymentId_gt: String
  paymentId_gte: String
  paymentId_contains: String
  paymentId_not_contains: String
  paymentId_starts_with: String
  paymentId_not_starts_with: String
  paymentId_ends_with: String
  paymentId_not_ends_with: String
  avatar: ImageWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    