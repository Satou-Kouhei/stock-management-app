import { putItem } from '@/lib/db';
import { getUserIdBySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function addItemAction(formData: FormData) {
    "use server" 

    const itemName = formData.get("item-name")?.toString();
    const itemQuantity = Number(formData.get("item-quantity"));
    const itemExpires = formData.get("item-expires")?.toString()?.trim();

    if(!itemName || isNaN(itemQuantity)) {
        console.log("品目と数量は必須です。");
        return;
    }

    const expiresAt = itemExpires ? new Date(itemExpires) : undefined;

    const userId = await getUserIdBySession();
    if(userId !== "") console.log(userId);

    await putItem(userId, itemName, itemQuantity, expiresAt)

    redirect("/stocks");
}