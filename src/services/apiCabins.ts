import { FieldValues } from "react-hook-form";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      throw new Error("Cabins couldn't be loaded");
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteCabin(id: number) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
      throw new Error("Cabins couldn't be loaded");
    }
  } catch (err) {
    console.error(err);
  }
}

export async function createEditCabin(newCabin: FieldValues, id?: number) {
  try {
    console.log(newCabin, id);
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
      "/",
      ""
    );
    const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create a new cabin

    // A) CREATE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase.from("cabins");

    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id)
      query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
      throw new Error("Cabins couldn't be created");
    }
    // 2. Upload the image to the storage
    if (hasImagePath) return;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, data.image);

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", newCabin.id);
      throw new Error("Cabin image couldn't be uploaded");
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
