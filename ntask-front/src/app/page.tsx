import { redirect } from "next/navigation";
import { login } from "./action";
import Button from "./components/Button";
import Input from "./components/Input";

/*
import { verifySession } from '@/app/lib/dal'
 
export default function Dashboard() {
  const session = await verifySession()
  const userRole = session?.user?.role // Assuming 'role' is part of the session object
 
  if (userRole === 'admin') {
    return <AdminDashboard />
  } else if (userRole === 'user') {
    return <UserDashboard />
  } else {
    redirect('/login')
  }
}
*/

export default async function Login() {
   const handleSubmit = async (formData: FormData) => {
      "use server";
      await login(formData);
      redirect("/tasks");
   };

   return (
      <section className="flex flex-col items-center gap-7 min-h-[100vh] bg-slate-100 px-5 pt-40">
         <h1 className="text-2xl">NTASK</h1>
         <form className="flex flex-col gap-7 relative items-center w-full max-w-96 mx-auto" action={handleSubmit}>
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Senha" name="password" id="password" />
            <Button customStyle="w-full" type="submit">
               Login
            </Button>
         </form>
      </section>
   );
}
