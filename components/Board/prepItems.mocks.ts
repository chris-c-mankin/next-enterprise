import { faker } from "@faker-js/faker"

interface PrepItem {
  id: number
  name: string
  description: string
  category: string
}

const categories = Array.from({ length: 10 }, () => faker.commerce.department())

export const prepItems: PrepItem[] = [
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: categories[Math.floor(Math.random() * categories.length)]!,
  })),
]
