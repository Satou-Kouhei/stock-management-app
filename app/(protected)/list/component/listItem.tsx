import { Card, CardHeader, CardTitle, CardDescription ,CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserIdBySession } from '@/lib/session';
import { getItems } from '@/lib/db';
import { Item } from '@/lib/types';
import { deleteItemAction } from '../../action';
import { Checkbox } from '@/components/ui/checkbox';

export default async function ListItems() {
    const userId: string = await getUserIdBySession();
    const items: Item[] | null = await getItems(userId);
    if(!items) return;

    return (
        <>
            <section id='list' className='container mx-auto mt-3'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            ストック数
                        </CardTitle>
                        <CardDescription>
                            全登録アイテム：{items.length}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {items?.length > 0 ? items.map((item) => 
                            <form key={item.id} action={deleteItemAction}>
                                <Card className='px-5'>
                                    <CardContent>
                                        <dl role='list' className='grid grid-cols-2'>
                                            <dt role='listitem'>品目</dt>
                                            <dd>{item.name}</dd>
                                            <dt role='listitem'>個数</dt>
                                            <dd>{item.quantity}</dd>
                                            <dt role='listitem'>使用期限/消費期限</dt>
                                            <dd>{!item.expiresAt ? "" : new Date(item.expiresAt).toLocaleDateString("ja-jp")}</dd>
                                            <dt role='listitem'>表示/非表示切り替え</dt>
                                            <dd>
                                                {item.deleteFlg ? "非表示" : "表示"}
                                                <Checkbox name='disp' value={String(item.deleteFlg)} />
                                            </dd>
                                        </dl>
                                        <Button name='itemId' value={item.id}>変更</Button>
                                    </CardContent>
                                </Card>
                            </form>
                        ) :
                            <p>何も登録されていません。</p>
                        }
                    </CardContent>
                </Card>
            </section>
        </>
    );
}