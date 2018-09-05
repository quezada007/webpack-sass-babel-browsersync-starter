/**
 * Cookies Module
 *
 * It contains a list of cookie functions like getCookie, setCookie and deleteCookie
 */
export const CookiesModule = {

    /**
     * Gets the value of a cookie
     *
     * @param cookieName string The cookie name to be used to retrieve its value
     * @returns string The value of the cookie
     */
    getCookie(cookieName){
        let name = cookieName + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookiesArray = decodedCookie.split(';');

        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i].trim();
            if (cookie.indexOf(name) === 0){
                return cookie.substring(name.length, cookie.length);
            }
        }
        return '';
    },

    /**
     * Set a cookie with the given name, value, days to expire and path
     *
     * @param cookieName string The name of the cookie
     * @param cookieValue string The value of the cookie
     * @param exdays int The number of days before it expires. Default: 6 weeks (42 days)
     * @param path string The path of the cookie. Default: '/'
     */
    setCookie(cookieName, cookieValue, exdays = 42, path = '/'){
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path};`;
    },

    /**
     * Set a cookie with the given name, value and path.
     * This cookie will expire when the session ends (Close Browser)
     *
     * @param cookieName string The name of the cookie
     * @param cookieValue string The value of the cookie
     * @param path string The path of the cookie. Default: '/'
     */
    setSessionCookie(cookieName, cookieValue, path = '/'){
        document.cookie = `${cookieName}=${cookieValue}; path=${path};`;
    },

    /**
     * Delete a given cookie
     *
     * @param cookieName string The cookie name of the cookie to delete
     * @param path string The path of the cookie. Default '/'
     */
    deleteCookie(cookieName, path = '/'){
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
};





