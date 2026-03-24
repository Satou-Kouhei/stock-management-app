import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function login() {
    async function loginAction(formData: FormData) {
        'use server'

        const username = formData.get("username");
        const userpass = formData.get("userpass");

    }
    return (
        <>
            <section className='flex-1 flex justify-center items-center py-12'>
                <Card className='px-6 w-full max-w-lg'>
                    <form action={loginAction}>
                        <FieldSet>
                            <FieldLegend>ログイン</FieldLegend>
                            <FieldDescription>ユーザー名とパスワードを入力してください。</FieldDescription>
                        </FieldSet>
                        <FieldGroup className='mt-5'>
                            <Field>
                                <FieldLabel htmlFor='username'>ユーザー名</FieldLabel>
                                <Input id='username' name='username' autoComplete='off' placeholder='ユーザー名を入力' />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='userpass'>パスワード</FieldLabel>
                                <Input id='userpass' name='userpass' type='password' autoComplete='off' placeholder='パスワードを入力' />
                            </Field>
                            <Button className='container mx-auto' type='submit'>ログイン</Button>
                        </FieldGroup>
                    </form>
                </Card>
            </section>
        </>
    )
}