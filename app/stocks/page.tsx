'use client'

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

type Storages = {
  id: number,
  description: {
      item: string,
      value: number,
    }
}

export default function stocks() {
  const [items,setItems] = useState<Storages[]>([]);
  const [item, setItem] = useState<string>("");
  const [value, setValue] = useState<number>(0);


  useEffect(() => {
    if (localStorage.length === 0) return;
    
    const storageItems: Storages[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const storages = localStorage.getItem(key);
      if (!storages) continue;
      
      storageItems.push(JSON.parse(storages));
    }
    setItems(storageItems);
  },[])

function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
  const id: number = localStorage.length + 1;
  const newData: Storages = {
    id: id,
    description: {
      item: item,
      value: value,
    }
  }

  localStorage.setItem(newData.id.toString(), JSON.stringify(newData));

  setItems(prev => [...prev, newData]);
}

  return (
    <>
      {items.map((items) => 
        <Card key={items.id}>
          <CardHeader>
            <CardTitle>
              ストック数
            </CardTitle>
          </CardHeader>
          <CardContent>
              <dl className='grid grid-cols-2'>
                <dt >品目</dt>
                <dd>{items.description.item}</dd>
                <dt>個数</dt>
                <dd>{items.description.value}</dd>
              </dl>
          </CardContent>
        </Card>
      )}

      <p>品目を入力</p>
      <Input type="text" placeholder='品目' value={item} onChange={prev => setItem(prev.target.value)}/>
      <p>数量を入力</p>
      <Input type="number" placeholder='数量' value={value} onChange={prev => setValue(Number(prev.target.value))}/>
      <Button size="default" variant="outline" onClick={handleOnClick}>
        追加
      </Button>
    </>
  );
}
