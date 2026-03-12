export default function landing(){
  return(
    <>
      <section className='top grid grid-cols-2 content-around container mx-auto gap-6 min-h-100 bg-green-200 p-4'>
        <img className='row-span-2 border border-black box size-100' src="/" alt="ロゴ未作成" />
        <h1 className='content-center text-6xl'>ストック管理アプリ</h1>
        <p>ストックを管理しましょう</p>
      </section>

      <section className='main content-around container mx-auto bg-amber-100 min-h-100'>
        <p className='content-center text-center'>ランディングページ</p>
        <p className='content-center text-center'>内容はこれから</p>
      </section>
    </>
  );
}
