import axios from 'axios';
import apiPath from '~/utils/apiPath';

export default (cancelToken, variable) => new Promise((resolve, reject) => {
   // const cache = sessionStorage.membersList ? JSON.parse(sessionStorage.membersList) : null;

   // if (cache && process.env.NODE_ENV === 'production') return resolve(cache)

   axios.get(`${apiPath}/generals${variable ? `?VariableName=${variable}` : ''}`, { cancelToken })
      .then(response => {
         const { data } = response
         sessionStorage.generalVariables = JSON.stringify(data);
         return resolve(data);
      })
      .catch(error => reject(error))
})
