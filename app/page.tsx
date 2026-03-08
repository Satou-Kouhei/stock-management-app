function toppage () {
    return (
        <>
            <header className='flex justify-around container mx-auto'>
                <h1>ストック管理アプリ</h1>
                <nav>
                    <ul className='flex gap-4'>
                        <li>ダッシュボード</li>
                        <li>一覧</li>
                    </ul>
                </nav>
            </header>
            <main className='min-h-screen'></main>
            <footer className='text-center'>&copy; 2026 さとうこうへい</footer>
        </>
    )
}

export default toppage;