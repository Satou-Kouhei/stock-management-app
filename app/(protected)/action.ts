import { putItem } from '@/lib/db';
import { getUserIdBySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function addItemAction(formData: FormData) {
    "use server" 

    console.log("追加開始")
    const itemName = formData.get("item-name")?.toString();
    const itemQuantity = Number(formData.get("item-quantity"));
    const itemExpires = formData.get("item-expires")?.toString()?.trim();

    if(!itemName || isNaN(itemQuantity)) {
        console.log(itemName);
        console.log(itemQuantity)
        console.log("品目と数量は必須です。");
        return;
    } else {
        console.log(`${itemName} : ${itemQuantity}`);
    }

    console.log(itemExpires);
    const expiresAt = itemExpires ? new Date(itemExpires) : undefined;
    console.log(expiresAt)

    const userId = await getUserIdBySession();
    if(userId !== "") console.log(userId);

    await putItem(userId, itemName, itemQuantity, expiresAt)

    redirect("/stocks");
}