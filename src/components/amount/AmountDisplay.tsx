import { formatCurrency } from "../../helpers/Helpers-Index"

type AmountDisplayProps = {
  label?:string
  amount:number
}

const AmountDisplay = ({label, amount}:AmountDisplayProps) => {
  return (
    <>
    <p className="text-2xl font-bolt text-blue-600 ">
      {label && `${label}: `}
      <span className="font-black text-neutral-500">{formatCurrency(amount)}</span>
    </p>
    </>
  )
}

export default AmountDisplay