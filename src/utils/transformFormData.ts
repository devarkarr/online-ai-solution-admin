export default function transformFormData<T>(payload: T) {
    const formData = new FormData()
  
    for (const property in payload) {
      formData.append(property, payload[property] as string | Blob)
    }
  
    return formData
  }
  