import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getItems } from '@/lib/db';
import { getUserIdBySession } from '@/lib/session';
import { Item } from '@/lib/types';
import { addItemAction } from '../action';

export default async function stocks() {
  const userId = await getUserIdBySession();
  const items: Item[] | null =await getItems(userId);
  if(items === null) return;

  return (
    <>
      <section id='add'>
        <Card>
          <form action={addItemAction}>
            <p>品目を入力</p>
            <Input name='item-name' type="text"/>
            <p>数量を入力</p>
            <Input name='item-quantity' type="number"/>
            <p>使用期限/消費期限を入力</p>
            <Input name='item-expires' type="date" />
            <Button type='submit' size="default" variant="outline">
              追加
            </Button>
          </form>
        </Card>
      </section>
      <section id='list'>
        <Card>
          <CardHeader>
            <CardTitle>
              ストック数
            </CardTitle>
          </CardHeader>

          {items?.length !== 0 ? items.map((items) => 
            <CardContent key={items.id}>
                <Card>
                  <dl className='grid grid-cols-2'>
                    <dt>品目</dt>
                    <dd>{items.name}</dd>
                    <dt>個数</dt>
                    <dd>{items.quantity}</dd>
                    <dt>使用期限/消費期限</dt>
                    <dd>{!items.expiresAt ? "" : items.expiresAt.toDateString()}</dd>
                    <dt>削除フラグ</dt>
                    <dd>{items.deleteFlg}</dd>
                  </dl>
                </Card>
            </CardContent>
          ) : "何も登録されていません。"}
        </Card>
      </section>
    </>
  );
}
