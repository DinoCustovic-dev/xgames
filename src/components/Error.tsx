interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({ message = 'An error occurred', onRetry }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
      <div className="text-center p-8 gaming-card max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-gaming-red-neon text-lg font-semibold mb-4">
          Error: {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-gaming mt-4"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

