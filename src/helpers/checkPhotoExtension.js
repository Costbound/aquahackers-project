const checkPhotoExtension = (photo) => {
    const allowedMimeTypes = [
        'image/jpeg', // JPEG
        'image/png',  // PNG
        'image/webp', // WebP
        'image/svg+xml', // SVG
        'image/gif'   // GIF
    ];

    return allowedMimeTypes.includes(photo.type);
}

export default checkPhotoExtension;