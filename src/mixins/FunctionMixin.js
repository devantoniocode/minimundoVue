import EventBus from '../event-bus';

export default {
    methods: {
        formataDecimal: function(valor, digitos = 2, padrao = null) {
            if (valor == null)
                valor = padrao;
            if (valor == null)
                return valor;

            var formatter = new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: digitos,
                maximumFractionDigits: digitos,
            });
            return formatter.format(valor);
        },

        convertToDecimal: function(valor, digitos = 2) {
            if (valor === '') {
                return '';
            } else if (valor.indexOf(',') === -1) {
                return valor;
            } else {
                valor = valor.toString().replace('.', '');
                valor = valor.slice(0, valor.indexOf(',')) + '.' + valor.slice(valor.indexOf(',') + 1, valor.indexOf(',') + digitos);
                return valor;
            }
        },

        formataValor: function(valor, digitos = 2) {

            if (valor == null)
                return valor;
            else
                return 'R$ ' + Intl.NumberFormat('pt-br', { minimumFractionDigits: digitos, maximumFractionDigits: digitos }).format(valor);
        },

        formataFloat: function(valor) {
            if (valor == null) {
                return valor;
            } else {
                if (valor.toString().includes('.')) {
                    valor = valor.toString().replace('.', ',');
                    valor = valor.toLocaleString();
                } else {
                    valor = valor.toLocaleString();
                }
                return valor;
            }
        },
        isEmpty(value) {
            return (value == null || value.toString().trim().length === 0);
        },

        dialogAlert: function(message) {
            EventBus.emit('dialogAlert', {
                show: true
                , message: message,
            });
        },

        dialogWait: function(show, message = null) {
            EventBus.emit('dialogWait', {
                show: show
                , message: message,
            });
        },

        dialogConfirmaSenha(message, funcao, funcao_sistema = 'FARMACEUTICO') {
            EventBus.emit('dialogConfirmaSenha', {
                message: message,
                funcao: funcao,
                funcao_sistema: funcao_sistema,
            });
        },

        toastMessage: function(message, tipo = 'success', life = 2000) {
            this.$toast.add({
                severity: tipo,
                summary: message,
                life: life,
            });
        },

        formataData: function(valor) {
            return valor != null ? new Date(valor).toLocaleDateString('pt-BR') : null;
        },

        validaDigito() {
            let num = num.replace(/-/g, '');

            var calc, i, check, checksum = 0, r = [2, 1]; // alternating routing table

            // iterate on all the numbers in 'num'
            for (i = num.length - 1; i--;) {
                calc = num.charAt(i) * r[i % r.length];
                //console.log(num.charAt(i), r[i % r.length], [calc]);
                // handle cases where it's a 2 digits number
                calc = ((calc / 10) | 0) + (calc % 10);
                checksum += calc;
            }
            check = (10 - (checksum % 10)) % 10; // make sure to get '0' if checksum is '10'
            let checkDigit = num % 10;

            return check == checkDigit;
        },

        cyrb53(str, seed = 0) {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        },

        fullScreen() {
            console.log('fullScreen');
            var elem = document.documentElement;
            console.log(elem);
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        },

        onlyNumbers(text) {
            var numbers = text.replace(/[^0-9]/g, '');
            return parseInt(numbers);
        },

        lastDay(qtdDays = 1) {
            var currentTime = new Date();
            var month = currentTime.getMonth() + 1;
            var year = currentTime.getFullYear();
            var day = currentTime.getDate();

            return year.toString() + '-' + month.toString().padStart(2, '0') + '-' + (day - qtdDays).toString().padStart(2, '0');
        },

        getCookie(name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        isMobile() {
            return window.innerWidth <= 1091;
        },

        isMonitorPequeno() {
            return window.innerWidth <= 1366;
        },
    },
};
