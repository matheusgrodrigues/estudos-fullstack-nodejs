interface InputProps
   extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "className"> {}

export default function Input({ ...props }: InputProps) {
   return <input className="w-full p-2 rounded-md bg-slate-200 placeholder-slate-600" {...props} />;
}
