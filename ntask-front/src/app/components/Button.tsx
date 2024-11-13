interface ButtonProps
   extends Omit<
      React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
      "className"
   > {
   customStyle?: string;
}

export default function Button({ children, customStyle, ...props }: ButtonProps) {
   return (
      <button
         className={`bg-blue-500 p-2 text-white rounded-md hover:opacity-90 transition-opacity ${customStyle}`}
         {...props}
      >
         {children}
      </button>
   );
}
