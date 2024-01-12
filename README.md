# Exporting Dependencies

In the terminal navigate to the python directory and run the following:

```bash
poetry lock
```

Then run:

```bash
poetry export --without-hashes --format=requirements.txt > requirements.txt
```

This will export the dependencies to a requirements.txt file.

# NextJS Start up

Setup folder structure.

Install `clsx` and `tailwind-merge`

```bash
npm install clsx tailwind-merge
```

Create file in src/lib/utils.ts

```ts
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

Create MaxWidthWrapper component in src/components/MaxWidthWrapper.tsx

```tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper

```
