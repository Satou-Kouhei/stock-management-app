import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator } from '@/components/ui/select';
import { getAllCategory } from '@/lib/db/db_category';
import { Category } from '@/lib/types';

export async function SelectCategory() {
    const categories: Category[] = await getAllCategory();
    const primaries: string[] = [...new Set(categories.map(category => category.primaryCategory))];

    return (
        <>
            <Select name='item-category'>
                <SelectTrigger className='w-auto'>
                    <SelectValue placeholder="分類を選択してください" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-white border shadow-md">
                    {primaries.map(async (primary) => {
                        const secondaries: Category[] = [];
                        for(const cat of categories) {
                            if(primary === cat.primaryCategory) {
                                secondaries.push(cat);
                            }
                        }
                        console.log(secondaries)
                        return (
                            <SelectGroup key={primary}>
                                <SelectLabel className='px-3 py-2 text-xs font-medium text-muted-foreground'>{primary}</SelectLabel>
                                {secondaries.map((sec) => {
                                    return (
                                        <SelectItem key={sec.id} value={sec.id}>{sec.secondaryCategory}</SelectItem>
                                    )
                                })}
                                <SelectSeparator className='border border-gray-300'/>
                            </SelectGroup>
                        );
                    }

                    )}
                </SelectContent>
            </Select>
        </>
    );
}