import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

// Upload Image to Firebase Storage & Update Firestore
export async function uploadProductImage(file: File, productId: string) {
    try {
        const storageRef = ref(storage, `product_images/${productId}/${file.name}`);

        // Upload the image
        await uploadBytes(storageRef, file);

        // Get the image URL
        const imageUrl = await getDownloadURL(storageRef);

        // Update the product document with the new image URL
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
            images: [imageUrl] // Store image URL
        });

        console.log("Image uploaded & product updated:", imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
