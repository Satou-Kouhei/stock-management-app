import { putItem, deleteItem } from '@/lib/db/db_item';
import { getUserIdBySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function addItemAction(formData: FormData) {
    "use server" 

    const itemName = formData.get("item-name")?.toString();
    const itemQuantity = Number(formData.get("item-quantity"));
    const itemExpires = formData.get("item-expires")?.toString()?.trim();
    const itemCategory = formData.get("item-category")?.toString();

    if(!itemName || isNaN(itemQuantity) || !itemCategory) {
        console.log("品目と数量と分類は必須です。");
        return;
    }

    const expiresAt = itemExpires ? new Date(itemExpires) : undefined;

    const userId = await getUserIdBySession();
    if(userId !== "") console.log(userId);

    await putItem(userId, itemName, itemQuantity, itemCategory, expiresAt);

    redirect("/list");
}

export async function deleteItemAction(formData: FormData) {
    "use server"

    try{
        const dispState = formData.get("disp") as string;
        const itemId = formData.get("itemId") as string;

        let isDisp = false;

        if(dispState === "false") {
            isDisp = true;
        } else {
            isDisp = false;
        }

        await deleteItem(itemId, isDisp)
    } catch(e) {
        console.log("エラー")
    } finally {
        redirect("/list");
    }
}