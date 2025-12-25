'use client';

import { RegisterUserDto } from '@/core/domain/types/register-user.types';
import { useRegister } from '@/hooks/auth/useRegister';
import { useRegisterForm } from '@/hooks/forms/useRegisterForm';

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const registerMutation = useRegister();
  const { register, handleSubmit, formState: { errors } } = useRegisterForm();

  const onSubmit = (data: RegisterUserDto) => {
    registerMutation.mutate(data);
    onSwitch()
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-light tracking-tight text-zinc-900">Crie sua conta</h1>
        <p className="mt-2 text-zinc-500">Gratuito e rapido.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-1">Nome</label>
          <input
            {...register('name')}
            placeholder="jose"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 shadow-sm transition-all focus:border-black focus:ring-0 placeholder:text-zinc-300"
          />
          {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>}
        </div>
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
          disabled={registerMutation.isPending}
          className="group relative w-full overflow-hidden rounded-2xl bg-black py-4 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:bg-zinc-400"
        >
          <span className="relative z-10">
            {registerMutation.isPending ? 'Autenticando...' : 'Criar conta'}
          </span>
        </button>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-200" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-50 px-2 text-zinc-400">Já possui conta?</span></div>
      </div>

      <button 
        onClick={onSwitch}
        className="block w-full rounded-2xl border border-zinc-300 py-4 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-all"
      >
        Fazer login agora!
      </button>
    </div>
  );
}