"use client"
import FileInput from '@/components/file-input'
import FormField from '@/components/form-field'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants'
import { useFileInput } from '@/lib/hooks/useFileInput'
import { ChangeEvent, FormEvent, useState } from 'react'

const UploadPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public"
    })

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    const [error, setError] = useState<string>("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if(!video.file || !thumbnail.file) {
                setError("Please upload both video and thumbnail files.");
                return;
            }

            if(!formData.title || !formData.description) {
                setError("Please fill in all the details.");
            }

            //upload the video to Bunny
            //Upload the thumbnail to DB
            //Atatch the thumbnail
            //Create a new DB entry fot the video details (urls, data)
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