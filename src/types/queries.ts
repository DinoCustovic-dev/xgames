// React Query-like interfaces for queries
export interface UseQueryResult<TData = unknown, TError = Error> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  refetch: () => void;
}

export interface UseMutationResult<TData = unknown, TVariables = unknown, TError = Error> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  reset: () => void;
}

