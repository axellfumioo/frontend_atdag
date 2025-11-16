'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, UserPlus } from 'lucide-react';
import api from '@/common/lib/apiClient';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || form.name.length < 3)
      return setError('Nama harus lebih dari 3 huruf');
    if (!form.email) return setError('Email harus diisi');
    if (!form.password || form.password.length < 6)
      return setError('Password lebih dari 6 huruf');

    setLoading(true);

    try {
      const res = await api.post('/api/v1/auth/register', form);
      setSuccess(res.data.message);
      setForm({ name: '', email: '', password: '' });

      // Redirect ke login setelah sukses
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Create your account
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <UserPlus className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="******"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow-sm"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <button
              onClick={() => router.push('/auth/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}