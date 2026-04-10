import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { addItemAction } from '../../action';

function AddItem() {
    return (
        <>
            <section id='add' className='container mx-auto mt-3'>
                <Card className='px-5'>
                    <CardHeader>
                        <CardTitle>新しい品目を追加</CardTitle>
                    </CardHeader>
                    <form action={addItemAction}>
                        <Label htmlFor='item-name'  className='mt-2'>品目を入力</Label>
                        <Input id='item-name' name='item-name' type="text" className='mt-2' />
                        <Label htmlFor='item-quantity' className='mt-2'>数量を入力</Label>
                        <Input id='item-quantity' name='item-quantity' type="number" className='mt-2' />
                        <Label htmlFor='item-expires' className='mt-2'>使用期限/消費期限を入力</Label>
                        <Input id='item-expires' name='item-expires' type="date" className='mt-2' />
                        <Button type='submit' size="default" variant="outline" className='mt-2'>
                            追加
                        </Button>
                    </form>
                </Card>
            </section>
        </>
    );
}

export default AddItem;