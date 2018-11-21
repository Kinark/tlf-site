const apiProdUrl = 'https://api.thelastflame.com.br';
const apiDevUrl = 'localhost:1337';

export default process.env.NODE_ENV === 'production' ? apiProdUrl : apiDevUrl;
