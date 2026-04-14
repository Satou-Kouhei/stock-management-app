import { Button } from '@/components/ui/button';
import { logoutAction } from '../(auth)/actions';

export default function LogOutButton() {
    return (
        <>
            <Button onClick={logoutAction}>ログアウト</Button>
        </>
    )
}