const ENCODED_KEY = "QVQuQWI4Uk42S2tkVFNkc2gxckw0d2k5R29KNko4em1xMlJVQXBWSDJZT1ZWeDNwbzZMZw==";

const CONFIG = {
    get API_KEY() {
        return atob(ENCODED_KEY);
    }
};