import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getItems } from '@/lib/db';
import { getUserIdBySession } from '@/lib/session';

export default async function dashboad() {
    const userId = await getUserIdBySession();
    if(!userId) return;

    const listItems = await getItems(userId);
    return (
        <>
            <section id='dashboad'>
                <h1>ダッシュボード</h1>
                <article className='description'>
                    <Card  className='container content-around mx-auto'>
                        <CardHeader>
                            <CardTitle>分類別</CardTitle>
                            <CardDescription>分類別の状況一覧</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-row content-around container mx-auto'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>分類１</CardTitle>
                                    <CardDescription>分類１の詳細</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    カード１
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>分類２</CardTitle>
                                    <CardDescription>分類２の詳細</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    カード２
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </article>

                <article className='graph'>
                    <Card className='container content-around mx-auto'>
                        <CardHeader>
                            <CardTitle>分類別統計</CardTitle>
                            <CardDescription>分類別の各種統計</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-row content-around container mx-auto'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>グラフ１</CardTitle>
                                    <CardDescription>１つめのグラフ</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    グラフ１
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>グラフ２</CardTitle>
                                    <CardDescription>２つめのグラフ</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    グラフ２
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </article>

                <article className='list'>
                    <Card className='container content-around mx-auto'>
                        <CardHeader>
                            <CardTitle>リスト</CardTitle>
                            <CardDescription>登録状況の一覧</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Card>
                                <ul className='grid grid-cols-3 justify-between px-5'>
                                    <li>品名</li>
                                    <li>数量</li>
                                    <li>使用期限/消費期限</li>
                                </ul>
                            </Card>
                            <ul>
                                {listItems?.length !== 0 ? listItems?.map((item) => {
                                    return (
                                        <li  key={item.id}>
                                            <Card>
                                                <ul className='grid grid-cols-3 justify-between px-5'>
                                                    <li>{item.name}</li>
                                                    <li>{item.quantity}</li>
                                                    <li>{!item.expiresAt ? "" : item.expiresAt.toDateString()}</li>
                                                </ul>
                                            </Card>
                                        </li>
                                    )
                                }): "何も登録されていません。\n 何か登録してみましょう！" }
                            </ul>
                        </CardContent>
                    </Card>
                </article>
            </section>
        </>
    )
}