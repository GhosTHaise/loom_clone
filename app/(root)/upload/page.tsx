"use client"
import FileInput from '@/components/file-input'
import FormField from '@/components/form-field'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants'
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from '@/lib/actions/video'
import { useFileInput } from '@/lib/hooks/useFileInput'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "AccessKey": accessKey,
            "Content-Type": file.type
        },
        body: file
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to upload file");
    })
}

const UploadPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [videoDuration, setVideoDuration] = useState(0)
    const [formData, setFormData] = useState<{ title: string, description: string, visibility: Visibility }>({
        title: "",
        description: "",
        visibility: "public"
    })

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration !== null || 0) {
            setVideoDuration(video.duration ?? 0);
        }
    }, [video.duration])


    const [error, setError] = useState<string>("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (!video.file || !thumbnail.file) {
                setError("Please upload both video and thumbnail files.");
                return;
            }

            if (!formData.title || !formData.description) {
                setError("Please fill in all the details.");
            }

            //get upload the video to Bunny url
            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey
            } = await getVideoUploadUrl();

            if (!videoUploadUrl || !videoAccessKey) {
                throw new Error("Failed to get video upload credentials");
            }
            //Upload the thumbnail to DB
            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);
            //Atatch the thumbnail
            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl
            } = await getThumbnailUploadUrl(videoId as string);

            if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) throw new Error("Failed to get thumbnail upload credentials");

            await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

            //Create a new DB entry fot the video details (urls, data)
            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration,
            })

            router.push(`/video/${videoId}`);
        } catch (error) {
            console.error("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a Video</h1>
            {error && <div className='error-field'>{error}</div>}

            <form
                className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7 5"
                onSubmit={handleSubmit}
            >
                <FormField
                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concise video title"
                />
                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this video is about"
                    as="textarea"
                />
                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.onChange}
                    onReset={video.resetFile}
                    type="video"
                />
                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.onChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />
                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" }
                    ]}
                    as="select"
                />

                <button
                    title="Create Video"
                    type="submit"
                    disabled={isSubmitting}
                    className='submit-button'
                >
                    {
                        isSubmitting ? "Uploading ..." : "Upload video"
                    }
                </button>
            </form>
        </div>
    )
}

export default UploadPage