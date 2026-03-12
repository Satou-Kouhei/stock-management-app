import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function dashboad() {
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
                            <ul>
                                <li><Card>登録１</Card></li>
                                <li><Card>登録２</Card></li>
                                <li><Card>登録３</Card></li>
                            </ul>
                        </CardContent>
                    </Card>
                </article>
            </section>
        </>
    )
}