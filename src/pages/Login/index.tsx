import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@stores/authStore';
import { User as UserType } from '@/types/models';
import Button from '@components/ui/Button';
import { User, Lock, Home } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // Simulate login for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock credentials for testing
      const validCredentials = {
        email: 'admin@masoud.com',
        password: 'admin123'
      };

      // Validate credentials
      if (formData.email !== validCredentials.email || formData.password !== validCredentials.password) {
        throw new Error('بيانات الدخول غير صحيحة');
      }

      // Mock user data
      const mockUser: UserType = {
        id: '1',
        email: formData.email,
        name: 'المدير التنفيذي',
        role: 'Viewer' as any,
      };

      const mockToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      setUser(mockUser);
      setTokens(mockToken, mockRefreshToken);

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-sand-50 px-4 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
            <Home className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {t('common.appName')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('common.companyName')}
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
          <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
            {t('auth.login')}
          </h2>

          {/* Demo Credentials */}
          <div className="mb-4 rounded-lg bg-info-50 p-3 text-sm dark:bg-info-900/20">
            <p className="mb-1 font-semibold text-info-700 dark:text-info-400">
              بيانات الدخول التجريبية:
            </p>
            <p className="text-info-600 dark:text-info-300">
              البريد: <span className="font-mono">admin@masoud.com</span>
            </p>
            <p className="text-info-600 dark:text-info-300">
              كلمة المرور: <span className="font-mono">admin123</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-error-50 p-3 text-sm text-error-700 dark:bg-error-900/20 dark:text-error-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-focus block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pe-10 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="admin@masoud.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="input-focus block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pe-10 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {t('auth.loginButton')}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            © 2025 {t('common.companyName')}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
