import type { PropsWithChildren } from "react"

// type ErrorMessageProps = {
//   children: ReactNode
// }

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      {children}
    </p>
  )
}

