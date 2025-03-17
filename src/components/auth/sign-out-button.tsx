'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/shadcn/button';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button type="button" variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
