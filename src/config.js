// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  getAnalytics
} from "firebase/analytics";

import {
  getFirestore
} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG2SXvN_2xY22EqqOtfUPaWNUQ6ZhGjNM",
  authDomain: "sichack-dcef8.firebaseapp.com",
  databaseURL: "https://sichack-dcef8-default-rtdb.firebaseio.com/",
  projectId: "sichack-dcef8",
  storageBucket: "sichack-dcef8.appspot.com",
  messagingSenderId: "678695342826",
  appId: "1:678695342826:web:c985d38ef08c3f0bbafd93",
  measurementId: "G-WR72YEBQD1"
};

export const ApiKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCigND+8p1ChfCz\nOOBj3UtYUhhdlT0+u1AIVwN72uhMO9aYc4Pr/q7KnHceK66xro5bdMei/K/3V0vl\nIVlZNipnycjFnHMkGszhf1OwGUimLw3il8cgkTadUzpZQBdJ4qcPsUS5kyg9wrBx\nS/cIKdWrPwfNjwx1lgl03Oiz5l3HDE6vJPrJ6MM/3x7ZRZ1rk+7rhnVp5d6YVGlZ\nFsEISV5Q23sRL2R6NM3U2msenYo1V25BOPnpDsdB9BEuTKmRme3ihRsERRybFmng\n5mtMLE44dLBzxiqXsLwW4jMmJUxrS7i9ewhKg4HQJeaDqBsSchvx0Yeh3VNTm6dT\nJQcyXVldAgMBAAECggEAMifHGcFBF2ymr3JRE5GUNTTVb2DmD8wZdhGBMkOM6iaX\n4+LXZ0nqof9r5oR9/TpOltyy11Pdbd5kPtqtrJLCwNjvXkqc4RpifQDjEBmlqiEg\nzHyjCaK4NBOhkTVuWrAZdwb0GsDYLUO/WKClJMBgweOI4YGSy2IdFhQuwIPMEuhz\nR5Vg4OwFwmaPp+doYPmz4onjl06llaXgtO2+LxdS3FPyUac0bQgS7DQtA7nh4Ik4\nF+NUQL62UgrJsM2zddm/RZdnL7ds8EZE9WdOkttcHWvM4QrNK4uBFfhKjzTLwtDp\n+MRZOsoiqjP18aFULU/kIisljTzjqgSrvmkytHAN0wKBgQDlMHmMqIkIGaZKc0LZ\nxObwoR05oeXnaEUt13MHIyYtVOtWShOONKLyD69kXNi7NgZTVUiJN5f//nNuPRSe\nlDSTggn2d91r3i9xdOCb1I6KaJriiDC3d19vUDmncwBv5KtVpQtaIuod+1DHAjqz\nfdHdsPo6bo05FMXHZbqSMgsFHwKBgQC1g0seRFgFb1T0/pqVH2TzWlD1JTpBG6B2\nWmTRYWTz5dlxdZ3ADrMTJ+PnLM1c3cB1KgY+qbgLc4FmNGyBVFcba+UByyB/ipXk\nkzpNNy9q0UNVO/j/2cVHNsk+ASBBSrXq7i+0PZDAt1EpvKD8mod0/whL77FDoCMc\nd25AnCB2AwKBgQCIWhSWeFY+OXRTastk3949Xr0SYp1y1PgDU+CdaG34HkN8rMmB\nmxMuS+KfJRXUG0ocHervp+GIbYujFDfGOIonEAB5X8qduCwlpdFTJFxBQAaVq0zA\negaPJP2H/8VMzJCafXyJfagnejMOkub1jm9jIz1bshXW1eLsxDsBa0BfJQKBgD3b\nVngkFlMT08ICGjADmOWNu9UvMKELhy2ONJleNYcgp2+RA4d1+vTmPTaFAB9LutCy\n15n3QK82V7y61NdmJKFFra9kx9hvJBHXUqEJ03D1i5q6a2rVjfNs6jvlKlbV3RUI\nwt0Ltg7W6iPtEnfDObJXTz6BmslPA2gqEzqVekJ9AoGBAJSHNhbKfm3NNt2l9sIT\nX70VyDvm435mrWK+u73x/bAELEjIKjwd31wh3t1ZZoMCGo39RAbHgC9Y+to8Sly/\nAMwMZ0WlueGV2FkhAF/qh2E6rTw7ou3nIQTd0laCXKQrKf9gnb0NSNqenNqxqj4l\niyalZ6+fCRN4yc8f3RDTzY7k\n-----END PRIVATE KEY-----\n"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
export default app;