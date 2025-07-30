import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_APP_SUPABASE_URL
const key = import.meta.env.VITE_APP_SUPABASE_KEY

const supabase = createClient(url, key)

export default function mediaUpload(file) {
    const mediaUploadPromise = new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected")
            return
        }

        // Generate unique file name using timestamp
        const timeStamp = new Date().getTime()
        const newName = timeStamp + "_" + file.name

        supabase.storage
            .from("images").upload(newName, file, {
                upsert: false,
                cacheControl: "3600"
            })
            .then((uploadResult) => {
                // Check if upload was successful
                if (uploadResult.error) {
                    reject("Upload failed: " + uploadResult.error.message)
                    return
                }

                // Get public URL
                const { data } = supabase.storage.from("images").getPublicUrl(newName)
                resolve(data.publicUrl)
            })
            .catch((error) => {
                reject("Error occurred in supabase connection: " + error.message)
            })
    })

    return mediaUploadPromise
}