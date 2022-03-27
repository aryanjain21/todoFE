import axios from 'axios';

(function (axios) {
    axios.interceptors.request.use(function (req) {
        if(req.url.includes('api')) {
            let user = JSON.parse(localStorage.getItem('setUser')) || {};
            req.headers.token = user.token;
        }
        return req;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('setUser');
                typeof window !== 'undefined' && window.location.reload();
                return Promise.reject(error);
            } else return Promise.reject(error);
        } else if (error.request) {
            let error = {
                response: {
                    data: {
                        message: "Something went wrong, Please try after some time!!!"
                    }
                }
            }
            return Promise.reject(error);
        }
    },  function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });
})(axios);