const reader = new FileReader();

export const handleFileRead = (file: File | any) => {
    return new Promise((resolve, reject) => {
        reader.onload = (event: any) => {
            const fileData = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                lastModifiedDate: file?.lastModifiedDate,
                // content: event.target.result,
            };
            resolve(fileData);
        };
        reader.onerror = (event: any) => {
            reject(event.target.error);
        };
        reader.readAsDataURL(file);
    });
};

export const fileSize = (sizeInBytes: number, type: string) => {
    const units: any = {
        bytes: 0,
        kb: 1,
        mb: 2,
        gb: 3,
        tb: 4
    };

    const bytes = Math.abs(sizeInBytes);
    const exp = Math.min(units[type.toLowerCase()], 4);

    const sizeInUnit = bytes / Math.pow(1024, exp);

    return parseFloat(sizeInUnit.toFixed(2));
};

export const formatFileSize = (size: number): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

    if (size === 0) {
        return '0 bytes';
    }

    const i = Math.floor(Math.log(size) / Math.log(1024));
    const formattedSize = (size / Math.pow(1024, i)).toFixed(2);

    return `${formattedSize} ${units[i]}`;
}

export const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
export const validImages = ['image/jpeg', 'image/png'];
export const validVideos = ['video/webm', 'video/mp4'];

export function jsonToFormData(json:any) {
    const formData = new FormData();
  
    const flattenObject = (obj:any, parentKey = '') => {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}[${key}]` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (obj[key] instanceof File) {
              formData.append(newKey, obj[key], obj[key].name);
            } else {
              flattenObject(obj[key], newKey);
            }
          } else {
            formData.append(newKey, obj[key]);
          }
        }
      }
    };
  
    flattenObject(json);
  
    return formData;
  }