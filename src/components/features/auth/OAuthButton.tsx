import { Button } from '@/components/ui/button';
import {useAuth} from '@/hooks/useAuth';

interface OAuthButtonProps {
    provider: 'google' | 'github';
    children: React.ReactNode;
    className?: string;
}

export const OAuthButton = ({ provider, children , className}: OAuthButtonProps) => {
    const {oauthLogin} = useAuth();

    const handleClick = () =>{
        oauthLogin(provider);
    };

    return (
        <Button
        variant='outline'
        size = 'lg'
        className={className}
        onClick={handleClick}>
            {children}
        </Button>
    )
}