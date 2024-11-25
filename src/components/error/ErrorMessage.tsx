type ErrprMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({children}:ErrprMessageProps) => {
  return (
    <p className="bg-red-600 text-white rounded-lg text-center p-3 ">
    {children}
    </p>
  )
}

export default ErrorMessage
