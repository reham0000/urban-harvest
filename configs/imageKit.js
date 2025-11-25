import ImageKit from "imagekit";

var imagekit = new ImageKit ({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privetKey: process.env.IMAGEKIT_PRIVET_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

export default imagekit;