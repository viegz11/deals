import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <section>
      <div className="card">
        <strong>Admin Panel</strong> - Role: {(session.user as any)?.role}
      </div>
      {children}
    </section>
  );
}
