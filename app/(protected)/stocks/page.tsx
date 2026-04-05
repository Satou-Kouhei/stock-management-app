import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getItems } from '@/lib/db';
import { getUserIdBySession } from '@/lib/session';
import { Item } from '@/lib/types';
import { addItemAction } from '../action';
import { Label } from '@/components/ui/label';

export default async function stocks() {
  const userId = await getUserIdBySession();
  const items: Item[] | null =await getItems(userId);
  if(items === null) return;

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

      <section id='list' className='container mx-auto mt-3'>
        <Card>
          <CardHeader>
            <CardTitle>
              ストック数
            </CardTitle>
          </CardHeader>

          <CardContent>
            {items?.length > 0 ? items.map((item) => 
                <Card key={item.id} className='px-5'>
                  <dl role='list' className='grid grid-cols-2'>
                    <dt role='listitem'>品目</dt>
                    <dd>{item.name}</dd>
                    <dt role='listitem'>個数</dt>
                    <dd>{item.quantity}</dd>
                    <dt role='listitem'>使用期限/消費期限</dt>
                    <dd>{!item.expiresAt ? "" : new Date(item.expiresAt).toLocaleDateString("ja-jp")}</dd>
                    <dt role='listitem'>削除フラグ</dt>
                    <dd>{item.deleteFlg ? "削除" : "有効"}</dd>
                  </dl>
                </Card>
            ) :
              <p>何も登録されていません。</p>
            }
          </CardContent>
        </Card>
      </section>
    </>
  );
}
