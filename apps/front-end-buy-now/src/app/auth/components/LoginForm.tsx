'use client';

import { LoginDto } from '@/core/domain/types/login.types';
import { useLogin } from '@/hooks/auth/useLogin';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const loginMutation = useLogin();
  const { register, handleSubmit, formState: { errors } } = useLoginForm();

  const onSubmit = (data: LoginDto) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-light tracking-tight text-zinc-900">Acesse sua conta</h1>
        <p className="mt-2 text-zinc-500">Insira seus dados para ter acesso aos melhores produtos.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-1">E-mail</label>
          <input
            {...register('email')}
            placeholder="exemplo@email.com"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-sm transition-all focus:border-black focus:ring-0 placeholder:text-zinc-300"
          />
          {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-1">Senha</label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-sm transition-all focus:border-black focus:ring-0 placeholder:text-zinc-300"
          />
          {errors.password && <span className="text-xs text-red-500 ml-1">{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="group relative w-full overflow-hidden rounded-2xl bg-black py-4 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:bg-zinc-400"
        >
          <span className="relative z-10">
            {loginMutation.isPending ? 'Autenticando...' : 'Entrar na conta'}
          </span>
        </button>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-200" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-50 px-2 text-zinc-400">Novo por aqui?</span></div>
      </div>

      <button 
        onClick={onSwitch}
        className="block w-full rounded-2xl border border-zinc-300 py-4 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-all"
      >
        Criar uma conta gratuita
      </button>
    </div>
  );
}