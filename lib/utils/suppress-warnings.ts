// Utility to suppress specific React warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn
  const originalError = console.error
  
  // Filter out specific Geist UI pointer event warnings
  const suppressedWarnings = [
    'onPointerEnterCapture',
    'onPointerLeaveCapture',
    'Unknown event handler property',
    'defaultProps will be removed',
    'crossOrigin'
  ]
  
  console.warn = (...args) => {
    const message = args.join(' ')
    const shouldSuppress = suppressedWarnings.some(warning => 
      message.includes(warning)
    )
    
    if (!shouldSuppress) {
      originalWarn.apply(console, args)
    }
  }
  
  console.error = (...args) => {
    const message = args.join(' ')
    const shouldSuppress = suppressedWarnings.some(warning => 
      message.includes(warning)
    )
    
    if (!shouldSuppress) {
      originalError.apply(console, args)
    }
  }
}

export {}