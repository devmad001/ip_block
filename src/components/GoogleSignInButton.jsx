import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';

export function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2"
    >
      <FcGoogle className="w-5 h-5" />
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  );
} 