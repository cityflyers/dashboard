declare module '@geist-ui/core' {
  import { ComponentPropsWithoutRef, ReactNode } from 'react'
  
  // Basic component props
  interface BaseGeistProps {
    onPointerEnterCapture?: never
    onPointerLeaveCapture?: never
    crossOrigin?: never
  }
  
  // Component exports
  export interface CardProps extends BaseGeistProps {
    children?: ReactNode
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface TextProps extends BaseGeistProps {
    children?: ReactNode
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
    h6?: boolean
    p?: boolean
    small?: boolean
    type?: string
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface GridProps extends BaseGeistProps {
    children?: ReactNode
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface GridContainerProps extends BaseGeistProps {
    children?: ReactNode
    gap?: number
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface SpacerProps extends BaseGeistProps {
    h?: number
    w?: number
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface BadgeProps extends BaseGeistProps {
    children?: ReactNode
    type?: string
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export interface ButtonProps extends BaseGeistProps {
    children?: ReactNode
    type?: string
    icon?: ReactNode
    auto?: boolean
    scale?: number
    onClick?: () => void
    placeholder?: string
    style?: React.CSSProperties
    [key: string]: any
  }
  
  export const Card: React.FC<CardProps>
  export const Text: React.FC<TextProps>
  export const Grid: React.FC<GridProps> & {
    Container: React.FC<GridContainerProps>
  }
  export const Spacer: React.FC<SpacerProps>
  export const Badge: React.FC<BadgeProps>
  export const Button: React.FC<ButtonProps>
  
  // Other components that might be used
  export const GeistProvider: React.FC<{ children: ReactNode }>
  export const CssBaseline: React.FC<{}>
  export const Input: React.FC<any>
  export const Select: React.FC<any>
  export const Link: React.FC<any>
  export const Avatar: React.FC<any>
  export const Popover: React.FC<any>
  export const Divider: React.FC<any>
  export const useToasts: () => any
}

// Global type augmentation to suppress React pointer event warnings
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      onPointerEnterCapture?: never
      onPointerLeaveCapture?: never
    }
  }
}