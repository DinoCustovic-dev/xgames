# Queries

React Query-like hooks for data fetching.

## Interface

All queries follow the `UseQueryResult` interface:

```typescript
interface UseQueryResult<TData, TError> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  refetch: () => void;
}
```

## Available Queries

### `useConsoles()`
Fetches console statuses with 5-second polling.

**Returns:** `UseQueryResult<Console[]>`

### `useGames()`
Fetches all games with console assignments.

**Returns:** `UseQueryResult<Game[]>`

### `useAdminStatus()`
Checks admin authentication status.

**Returns:** `UseQueryResult<AdminStatus>`

## Mock Mode

Set `NEXT_PUBLIC_USE_MOCK=true` in environment variables to use localStorage-based mocks instead of API calls.

