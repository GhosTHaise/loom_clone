"use client"
import FileInput from '@/components/file-input'
import FormField from '@/components/form-field'
import { ChangeEvent, useState } from 'react'

const UploadPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public"
    })
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (e: ChangeEvent) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a Video</h1>
            {error && <div className='error-field'>{error}</div>}

            <form className="ronuded-20 shadow-10 gap-6 w-full flex-flex-col px-5 py-7 5">
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
                <FileInput />
                <FileInput />
                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={[
                        {value : "public", label : "Public"},
                        {value : "private", label : "Private"}
                    ]}
                    as="select"
                />
            </form>
        </div>
    )
}

export default UploadPage