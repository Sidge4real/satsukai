export interface IQueryOptions {
  categories: string[];
  sizes: string[];
  prices: string[];
}

export interface IServerSideProps {
    query: IQueryOptions
  }