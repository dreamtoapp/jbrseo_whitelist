type Props = {
  login: (formData: FormData) => void | Promise<void>;
};

export function DashboardLogin({ login }: Props) {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl p-8">
          <h1 className="text-2xl font-bold mb-2">لوحة التحكم</h1>
          <p className="text-foreground/70 mb-6">أدخل كلمة المرور للوصول</p>

          <form action={login} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm">كلمة المرور</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 outline-none focus:ring-2 focus:ring-foreground/40"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-foreground/20 hover:bg-foreground/30 text-foreground font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground/30"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

