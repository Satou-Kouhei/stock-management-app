import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryById} from '@/lib/db/db_category';
import { getItems } from '@/lib/db/db_item';
import { getUserIdBySession } from '@/lib/session';

export default async function ListDioplay() {
    const userId = await getUserIdBySession();
    const items  = await getItems(userId);
    if(!items) return;

    return (
        <>
            <section id='list' className='mt-5'>
                <Card className='container mx-auto'>
                    <CardHeader>
                        <CardTitle>一覧</CardTitle>
                        <CardDescription>登録品目数：</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Card>
                            <CardContent>
                                <ul className='grid grid-cols-4 justify-around'>
                                    <li>品名</li>
                                    <li>数量</li>
                                    <li>分類</li>
                                    <li>使用期限/消費期限</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <ul>
                            {items.length > 0 ? items.map(async (item) => {
                                const category = await getCategoryById(item.categoryId);
                                return (
                                    item.deleteFlg ? "" :
                                        <li key={item.id}>
                                            <Card>
                                                <CardContent>
                                                    <ul className='grid grid-cols-4 justify-around'>
                                                        <li>{item.name}</li>
                                                        <li>{item.quantity}</li>
                                                        <li>{category}</li>
                                                        <li>{item.expiresAt ? item.expiresAt.toLocaleDateString("ja-jp") : ""}</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </li>
                                )
                            }) :
                                <Card>
                                    <CardContent>
                                        <p className='text-red-500'>まだ何も登録されていません。登録してみましょう！</p>
                                    </CardContent>
                                </Card>
                            }
                        </ul>

                    </CardContent>
                </Card>
            </section>
        </>
    );
}