export type Movies = {
  count: number
  next: number | null
  previous: number | null
  results: Movie[]
}

export type Actors = {
  count: number
  next: number | null
  previous: number | null
  results: Actor[]
}

export type Reviews = {
  count: number
  next: number | null
  previous: number | null
  results: Review[]
}

export type Actor = {
  id: number
  first_name: string
  last_name: string
}

export type Movie = {
  id?: number
  title: string
  description: string
  actor_ids: number[]
  actors?: Actor[]
  reviews?: Review[]
}

export type Review = {
  id: number
  grade: number
  movie: number
}
