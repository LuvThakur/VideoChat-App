const isInternetConnected = async () => {
    try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        return true;
    } catch (error) {

        console.log("No internet")
        return false;
    }
};

export default isInternetConnected;
