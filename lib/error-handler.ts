export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    
    Error.captureStackTrace(this, this.constructor)
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode
    }
  }

  // Supabase errors
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      error: (error as any).message,
      statusCode: 400
    }
  }

  // Unknown errors
  console.error('Unknown error:', error)
  return {
    error: '서버 오류가 발생했습니다.',
    statusCode: 500
  }
}

export const logError = (error: unknown, context?: string) => {
  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    context,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : error
  }

  if (process.env.NODE_ENV === 'production') {
    // Production: 구조화된 로깅
    console.error(JSON.stringify(errorInfo))
  } else {
    // Development: 읽기 쉬운 형태로 로깅
    console.error('=== Error Log ===')
    console.error('Time:', timestamp)
    if (context) console.error('Context:', context)
    console.error('Error:', error)
    console.error('================')
  }
}