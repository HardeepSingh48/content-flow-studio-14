import { useEffect} from 'react';
import { useNavigate , useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {toast} from 'sonner';
import { Loader2 } from 'lucide-react'

const OAuthCallback = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const { setAuthFromToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const provider = searchParams.get('provider');
        const error = searchParams.get('error');

        if(error){
            toast.error(`OAuth login failed: ${error}`);
            navigate('/signin');
            return;
        }
        if(token && provider) {
            try{
                setAuthFromToken(token);
                toast.success(`Successfully logged in with ${provider}!`);
                navigate('/dashboard');
            }
            catch(err){
                toast.error('Failed to log in with OAuth');
                navigate('/signin');
            }
        }
        else{
            toast.error("Invalid Oauth Response");
            navigate('/signin');
        }
    
        }, [navigate, searchParams, setAuthFromToken]);

        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className='text-center'>
                    <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4'/>
                    <p>Completing Sign in...</p>
                </div>
            </div>
        )
    
}

export default OAuthCallback;