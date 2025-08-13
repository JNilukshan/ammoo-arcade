import { HTMLAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    className?: string;
  }
  interface SVGAttributes<T> {
    className?: string;
  }
}

// Fix for shadcn/ui components
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      className?: string;
    }
  }
}

export {};
