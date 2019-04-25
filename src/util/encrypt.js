import CryptoJS from 'crypto-js';
export default  {
     // aes 加密参数
     EncryptRequest( jsonStr){
        var secKey = CryptoJS.enc.Utf8.parse("be88887d941ea4b7");
        var nonce = CryptoJS.enc.Utf8.parse("0CoJUm6Qyw8W8jud");
        var encText = this.AesEncrypt(this.AesEncrypt(jsonStr, nonce), secKey);
        encText = encText.replace(/\+/g,"%2B");
        return encText;
      },
       AesEncrypt:function(text,key){
        let srcs = CryptoJS.enc.Utf8.parse(text);
        const iv = CryptoJS.enc.Utf8.parse('0102030405060708'); 
        var encryptedData = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        
        return encryptedData.toString();
      }
}