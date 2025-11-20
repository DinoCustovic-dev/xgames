# Mutations

React Query-like hooks for data mutations.

## Interface

All mutations follow the `UseMutationResult` interface:

```typescript
interface UseMutationResult<TData, TVariables, TError> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  reset: () => void;
}
```

## Available Mutations

### `useLogin()`
Authenticates admin user.

**Variables:** `{ password: string }`  
**Returns:** `UseMutationResult<LoginData, LoginVariables>`

### `useUpdateConsoleStatus()`
Updates console status (occupied/free).

**Variables:** `{ consoleId: number, status: 'free' | 'occupied', password: string }`  
**Returns:** `UseMutationResult<UpdateConsoleStatusData, UpdateConsoleStatusVariables>`

### `useLogout()`
Logs out admin user.

**Variables:** `void`  
**Returns:** `UseMutationResult<LogoutData, void>`

### `useSetupDatabase()`
Initializes database with seed data.

**Variables:** `void`  
**Returns:** `UseMutationResult<SetupDatabaseData, void>`

## Mock Mode

Set `NEXT_PUBLIC_USE_MOCK=true` in environment variables to use localStorage-based mocks instead of API calls.

