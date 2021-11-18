export interface PageProps<T> {
  session: string
  query: T
}

export interface OrderPageQueryParams {
  type: string
}

export interface OrderPageProps extends PageProps<OrderPageQueryParams> {}
