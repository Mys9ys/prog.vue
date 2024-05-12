export const baseConfig = {
    // BASE_URL: 'http://git.lk-partners/mob_app/ajax/',
    BASE_URL: window.location.href.includes('localhost') ? 'http://prog.loc/mob_app/ajax/' : '/mob_app/ajax/'
}