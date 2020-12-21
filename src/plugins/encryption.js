import CryptoJS from 'crypto-js/crypto-js'

export default {

    encrypt(word) {
            const key = CryptoJS.enc.Utf8.parse("xhterjSeenciretl");
            const iv = CryptoJS.enc.Utf8.parse("xhterjSeencetliv");

        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        // console.log("-=-=-=-", encrypted.ciphertext)
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    }


}