'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { handleSignIn } from '@/libs/auth/helpers';
import { formSchema, type SignInFormSchema } from '@/validation/singInForm';

export default function SignInPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
    },
  });

  async function onSubmit(values: SignInFormSchema) {
    try {
      setIsPending(true);
      setErrorMsg(null);

      // Validate the form data
      const parsedCredentials = formSchema.safeParse({
        email: values.email,
        password: values.password,
      });

      if (!parsedCredentials.success) {
        setErrorMsg('Некоректний email або пароль');
        return;
      }

      await handleSignIn(values);
      router.push('/');
      router.refresh();
    } catch (error: unknown) {
      setErrorMsg('Помилка при вході. Будь ласка, спробуйте ще раз.');
      console.error('Sign-in error:', error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Вхід</CardTitle>
          <CardDescription>
            Введіть ваші дані для доступу до обліку
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password123"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMsg && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                  {errorMsg}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Вхід...' : 'Вхід'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
