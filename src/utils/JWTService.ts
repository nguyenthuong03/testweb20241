import { jwtDecode } from "jwt-decode";


export interface JwtPayload {

   id : number;
   role : string;
}

export function getToken() {
   const token = localStorage.getItem('token');
   
   return token;
}
export function isTokenExpired(token: string) {
   const decodedToken = jwtDecode(token);

   if (!decodedToken.exp) {
      // Token không có thời gian hết hạn (exp)
      return false;
   }

   const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

   return currentTime > decodedToken.exp;
}

export function isToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return true;
   }
   return false;
}




export function getUsernameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return jwtDecode(token).sub;
   }
}

export function getIdUserByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.id;
   }
}



export function logout(navigate: any) {
   navigate("/");
   localStorage.removeItem('token');

}
export function removeToken() {
    localStorage.removeItem('token');
    return;
 }