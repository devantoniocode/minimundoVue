import axios from "axios";
import {userStorage} from "../storage/UserStorage"
import FunctionMixin from "./FunctionMixin.js"
import EventBus from "/src/event-bus"

const serverRoute = 'http://127.0.0.1:8000/api/';

import FileDownload from 'js-file-download';

export default {

    mixins: [FunctionMixin],
    data() {
        return {
            serverRouteMixin: undefined,
            // tokenAux: '18|3Ib3sYWmty9hwxkVpp4Fso0KbdSrL5ToNN69FfwU21b02347'
        }
    },
    mounted() {
        this.serverRouteMixin = serverRoute;
    },
    methods: {
        async axiosData(route, formData) {
            return new Promise((resolve, reject) => {
                axios.defaults.baseURL = serverRoute
                axios.defaults.withCredentials = true
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                const config = {
                    method: 'post',
                    url: route,
                    params: formData,
                }
                axios.request(config)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        EventBus.emit("showProgressBar", false)
                        this.handleError(error)
                        reject(error)
                    })
            })
        },

        async axiosShow(route, formData = null) {
            return new Promise((resolve) => {
                axios.defaults.withCredentials = true
                axios.defaults.baseURL = serverRoute
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.get(route, {params: formData})
                    .then((response) => {
                        this.itemSelected = {}
                        this.registros = response.data.registros
                        if (response.data.totais != null)
                            this.registros.totais = response.data.totais


                        resolve(response)
                    })
                    .catch((error) => {
                        this.handleError(error)
                    })
            })
        },

        async axiosGet(route, formData = null, handleError = true) {
            return new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true
                axios.defaults.baseURL = serverRoute
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.get(route, {params: formData})
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)

                        if (handleError) {
                            this.handleError(error)
                        }
                    })
            })
        },

        async axiosEdit(route, formData = null) {
            this.loadingTable = true

            return new Promise((resolve) => {
                axios.defaults.withCredentials = true
                axios.defaults.baseURL = serverRoute
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.get(route, {params: formData})
                    .then((response) => {
                        this.form = response.data.registro
                        this.skeleton = false
                        resolve(response)
                    })
                    .catch((error) => {
                        this.handleError(error)
                    })
            })
        },

        async axiosStore(route, formData, message = true) {
            this.loadingStore = true

            return new Promise((resolve, reject) => {
                let method
                let url
                let msg
                if (Object.prototype.hasOwnProperty.call(formData, "id")) {
                    method = 'put'
                    url = `${route}/${formData.id}`
                    msg = 'Registro alterado com sucesso!'
                } else {
                    method = 'post'
                    url = route
                    msg = 'Registro criado com sucesso!'
                }

                axios.defaults.baseURL = serverRoute
                axios.defaults.withCredentials = true
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`

                const config = {
                    method: method,
                    url: url,
                    params: formData,
                }

                axios.request(config)
                    .then((response) => {
                        this.loadingStore = false
                        if (message) {
                            this.$toast.add({severity: 'success', summary: 'Sucesso', detail: msg, life: 3000})
                        }
                        resolve(response.data)
                    })
                    .catch((error) => {
                        this.handleError(error)
                        reject(error)
                    })
            })
        },

        async axiosPost(route, formData = null) {
            return new Promise((resolve) => {
                axios.defaults.baseURL = serverRoute
                axios.defaults.withCredentials = true
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.post(route, {params: formData})
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        this.handleError(error)
                    })
            })
        },

        async axiosPostData(route, formData = null, handleError = true) {
            return new Promise((resolve, reject) => {
                axios.defaults.baseURL = serverRoute
                axios.defaults.withCredentials = true
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.post(route, formData)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        if (handleError) {
                            this.handleError(error)
                        }
                        reject(error)
                    })
            })
        },

        async axiosPutData(route, formData = null) {
            return new Promise((resolve, reject) => {
                axios.defaults.baseURL = serverRoute
                axios.defaults.withCredentials = true
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.put(route, formData)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        this.handleError(error)
                        reject(error)
                    })
            })
        },

        async axiosDestroy(route) {
            return new Promise((resolve, reject) => {
                axios.defaults.withCredentials = true
                axios.defaults.baseURL = serverRoute
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`
                axios.delete(route)
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        this.handleError(error)
                        reject(error)
                    })
            })
        },

        async axiosPdf(rota, formData = null) {
            this.dialogWait(true)
            return new Promise((resolve, reject) => {
                const config = {
                    method: 'get',
                    url: rota,
                    responseType: 'blob',
                    params: formData
                };

                axios.defaults.baseURL = this.serverRouteMixin;
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`;
                axios.defaults.withCredentials = true
                axios.request(config)
                    .then((response) => {
                        resolve(response)
                    })
                    .catch(async (error) => {
                        if (error.response.status === 498)
                            error.response.data.message = JSON.parse(await error.response.data.text()).message
                        this.handleError(error)
                        reject(error)
                    });
            })
        },

        async axiosExport(rota, formData = null, fileName = 'download.xlsx') {
            this.dialogWait(true)
            return new Promise((resolve, reject) => {
                const config = {
                    method: 'get',
                    url: rota,
                    responseType: 'blob',
                    params: formData
                };

                axios.defaults.baseURL = this.serverRouteMixin;
                axios.defaults.headers.common["Authorization"] = `Bearer ${userStorage().token}`;
                axios.defaults.withCredentials = true
                axios.request(config)
                    .then((response) => {
                        this.dialogWait(false)
                        FileDownload(response.data, fileName);
                        resolve(response)
                    })
                    .catch(async (error) => {
                        if (error.response.status === 498)
                            error.response.data.message = JSON.parse(await error.response.data.text()).message
                        this.handleError(error)
                        reject(error)
                    });
            })
        },

        handleError(error) {
            this.loadingStore = false
            this.loadingTable = false
            if (typeof this.dialogWait === "function")
                this.dialogWait(false)

            if (this.wait)
                this.wait = false
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                this.$nextTick(() => {
                    this.$router.push('/auth/login')
                })
            } else if (error.response.status === 422) {
                this.errors = error.response.data.errors
            } else if (error.response.status === 403) {
                //this.$router.push('/error-page')
                this.$router.push('/auth/access')
            } else if (error.response.status === 498) {
                EventBus.emit("dialogAlert", {show: true, message: error.response.data.message})
            } else if (error.response.status === 499) {
                EventBus.emit("dialogErro499", true)
            } else if (error.response.status === 500) {
                let message = '';
                let user = userStorage().user
                if (user != null && user.dev == 1)
                    message = 'Erro Encontrado (500)<br><br>' + error.response.data.message
                else
                    message = 'Erro Encontrado!'

                EventBus.emit("dialogErro500", {show: true, message: message})
            } else {
                let message = '';
                let user = userStorage().user
                if (user != null && user.dev == 1)
                    message = `Erro código (${error.response.status})<br><br>${error.message}`
                else
                    message = 'Erro Encontrado!'

                EventBus.emit("dialogAlert", {show: true, message: message})
            }
        }

    }

}