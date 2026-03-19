import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir el root al salón por defecto (dashboard principal)
  redirect('/salon');
}
